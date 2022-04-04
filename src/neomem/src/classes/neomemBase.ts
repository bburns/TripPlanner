// neomem
// the main neomem class

import { decorate, observable, action } from 'mobx';

import { IPlugin, Auth, User, UserId, Cache, INode, NodeId, NodeValue, Pattern, Props } from '../types';
import { Datastore } from '../datastores/types';
import { Node } from './node';
// import { Neomem } from './neomem';

//. dont want to import from higher dirs?
import { ontology as neomemOntology } from '../data/ontology';


export class NeomemBase {

  //----------------------------------------------------------------------
  // init
  //----------------------------------------------------------------------

  initializing = true;
  user: User|undefined;
  auth: Auth;
  // plugins: IPlugin[] = [];
  // plugins: Map<string, IPlugin> = new Map();
  plugins: {
    [index:string]: IPlugin,
  } = {};
  // subscribers: Subscriber[] = [];
  db: Datastore = {} as Datastore; // if don't set a value here, get an error in the constructor - why?
  cloud: Datastore = {} as Datastore; // if don't set a value here, get an error in the constructor - why?
  local: Datastore = {} as Datastore; // if don't set a value here, get an error in the constructor - why?
  
  cache: Cache = {}; // the dictionary of nodes, indexed by id - a cache between db and ui
  // cache: Cache = new Map(); // the dictionary of nodes, indexed by id - a cache between db and ui
  currentNodeId: NodeId|undefined;
  currentUserId: NodeId|undefined; //. just here for mobx
  

  constructor(cloud: Datastore, local: Datastore, auth: Auth) {
    this.cloud = cloud;
    this.local = local;
    this.auth = auth;
    // db points to either cloud or local //. not the greatest solution - better way?
    this.db = local; // start with localstoragedb
  }


  addPlugin(plugin: IPlugin) {
    plugin.initialize(this as any);
    // note: constructor.name is avail for any instance of a class
    this.plugins[plugin.constructor.name] = plugin;
  }


  //----------------------------------------------------------------------
  // ui
  //----------------------------------------------------------------------

  setInitializing(initializing: boolean) {
    this.initializing = initializing;
  }

  setCurrentNodeId(nodeId: NodeId) {
    this.currentNodeId = nodeId;
  }


  //----------------------------------------------------------------------
  // user
  //----------------------------------------------------------------------

  //. this is so so hacky - keeping copy of userid in app to have an observable,
  // while also exists down in the db ughh
  //. shouldn't use this in ui - use the value directly, as it's observable, eh?
  getCurrentUserId() {
    // const currentUserId = this.neomem.getCurrentUserId();
    const currentUserId = this.db.getCurrentUserId();
    if (currentUserId !== this.currentUserId) throw new Error('mismatched userids');
    return currentUserId;
  }
  setCurrentUserId(userId?: UserId) {
    this.currentUserId = userId;
    // this.neomem.setCurrentUserId(userId);
    this.db.setCurrentUserId(userId);
  }

  async loadUserNodes() {
    // get from db, not cache!
    const nodes = await this.db.getNodes(); //. just get all nodes, for now
    // fill the cache with user nodes (skips system nodes)
    for (let node of nodes) {
      this.createNode(node);
    }
  }

  async saveUserNodes() {
    const allNodes = this.getNodes(); // get all nodes in the cache
    const userNodes = allNodes.filter(node => !node.system); // ditch system nodes
    await this.db.saveNodes(userNodes);
  }


  async createUser(user: User): Promise<User> {
    return await this.db.createUser(user);
  }

  async getUser(userId: UserId): Promise<User|undefined> {
    const user = await this.db.getUser(userId);
    return user;
  }

  //. a bit funky
  async getCloudUser(userId: UserId): Promise<User|undefined> {
    const user = await this.cloud.getUser(userId);
    return user;
  }

  async deleteUser(userId: UserId) {
    await this.db.deleteUser(userId);
  }


  //----------------------------------------------------------------------

  // handle change in user login state.
  // userToken is an object from the authorization provider - will be null if not logged in.
  // it has a bunch of info, and .uid - a unique user id.
  // so get user data from cloud db, convert from anonymous user, or make new anonymous user.
  //. app should work even without this getting called, to use anonymous/in-memory user.
  async handleAuthChange(userToken: any) {
    console.log('handleauthchange', userToken && userToken.uid);
    // is a user logged in?
    if (userToken) {
      // yes
      console.log('usertoken exists - do signin to check if in db etc');
      //. also could have name/email/pic if want those permissions
      const userId = userToken.uid; // a 28 alphanum char id, from firebase auth
      // check if user in db
      const user = await this.getCloudUser(userId); //.
      if (user) {
        await this.signinExistingUser(user);
      } else {
        const newUser = { id: userId }; //. could add name, email etc
        await this.signinNewUser(newUser);
      }
    } else {
      // no-one logged in - make an anonymous user
      await this.signinAnonymousUser();
    }
    // once we know if we're logged in or not we can render more of the ui (eg the signin menu)
    console.log('set initializing off - this will trigger ui rendering');
    this.setInitializing(false);
  }


  async signinExistingUser(user: User) {
    // yes - load nm ontology, then app ontology, then user nodes, and set node to welcome
    console.log('signinexisting - user in db - load ontology and nodes', user);
    const anonNodes = await this.local.getNodes(); // get anon user's data, if any //. skip system nodes //.
    this.db = this.cloud; // switch to cloud db //.
    this.setCurrentUserId(user.id);
    this.initializeCache();
    await this.loadUserNodes(); // load user nodes from db
    this.load(anonNodes); // mixin anon user's data
    await this.saveUserNodes(); // save the mixed in data to db
    this.setCurrentNodeId('welcome'); //.
    return user;
  }

  async signinNewUser(user: User) {
    this.db = this.cloud; // switch to cloud db //.
    await this.createUser(user);
    return await this.signinExistingUser(user);
    // // nm may have data in cache - save it
    // console.log('signinnew - user not in db - save nm cache data');
    // const anonNodes = this.neomem.local.getNodes(); // get anon user's data, if any //. skip system nodes //.
    // this.neomem.db = this.neomem.cloud; // switch to cloud db //.
    // this.setCurrentUserId(user.id);
    // this.neomem.saveUserNodes();
  }

  signinAnonymousUser() {
    console.log('signinanon');
    this.db = this.local; // switch to local db
    this.setCurrentUserId(); // none
    this.initializeCache();
    this.setCurrentNodeId('welcome'); // will update ui //.
  }

  signout() {
    this.signinAnonymousUser();
  }
  
  //----------------------------------------------------------------------
  // cache
  //----------------------------------------------------------------------

  private initializeCache() {
    this.clearCache();
    this.loadOntology();
    for (let plugin of Object.values(this.plugins)) {
      plugin.loadData();
    }
  }

  private setCacheNode(nodeId: NodeId, node: INode): void {
    this.cache[nodeId] = node;
  }

  // throws an error if node not found, to prevent further errors
  private getCacheNode(nodeId: NodeId): INode {
    const node = this.cache[nodeId]; // returns undefined if not there
    if (node === undefined) {
      throw new Error(`Node not found in cache: '${nodeId}'`);
    }
    return node;
  }

  private getCacheNodes(): INode[] {
    return Object.values(this.cache);
  }

  private deleteCacheNode(nodeId: NodeId): void {
    delete this.cache[nodeId];
  }

  clearCache(): void {
    this.cache = {};
  }


  //----------------------------------------------------------------------
  // load/save
  //----------------------------------------------------------------------

  load(nodes: Props[]) {
    for (let node of nodes) {
      this.createNode(node);
    }
    // handle parentIds
    // mainly want to make sure trips are set as children of welcome
    for (let node of nodes) {
      if (node.parentId) {
        this.addChild(node.id, node.parentId);
      }
    }
  }

  loadOntology(): void {
    this.load(neomemOntology);
  }

  // save all user nodes to current backend
  save() {
  }


  //----------------------------------------------------------------------
  // import/export
  //----------------------------------------------------------------------

  // get all data in cache/db as string
  // see also getTreeText
  getText(): string {
    return '';
  }

  //. this would replace all data in db?
  setText(text: string) {
  }

  //. parse text and add nodes
  importText(text: string) {
  }

  
  //----------------------------------------------------------------------
  // nodes
  //----------------------------------------------------------------------

  // make a node object and add it to the store
  // pass optional {parentId} for the parentchild relation
  //. uhh, or do that in separate step, so can handle loading a bunch of nodes at once
  createNode(props: Props = {}): INode {

    // adds an id if not specified
    const node = new Node(props);

    // save node to cache
    this.setCacheNode(node.id, node);

    // // add node to parent's children collection, if parentId specified
    // //. should walk through available relations, check for parts, etc

    // //. what if parent doesnt exist yet, as when loading a bunch of stuff from database? then bombs!
    // //  that's an argument for just keeping id's in neomem instead of actual refs
    // //  until we switch to a better cache system
    // if (node.parentId) {
    //   this.addChild(node.id, node.parentId);
    // }

    // notify subscribers
    // this.notify('add', node.id, node); //?
    // this.notify('create', node);
    if (!node.system) {
      this.db.createNode(node);
    }

    return node;
  }


  //----------------------------------------------------------------------
  // node values
  //----------------------------------------------------------------------

  //. bombs if node not there
  setNodeValue(nodeId: NodeId, fieldId: string, fieldValue: any): void {
    console.log('setnodevalue', nodeId, fieldId, fieldValue);
    this.cache[nodeId][fieldId] = fieldValue;
    //. tell subscribers
    // this.db.set
  }

  //. bombs if node not there
  // will return undefined if field not there
  getNodeValue(nodeId: NodeId, fieldId: string): NodeValue {
    return this.cache[nodeId][fieldId];
  }

  //. bombs if node not there
  deleteNodeValue(nodeId: NodeId, fieldId: string): void {
    delete this.cache[nodeId][fieldId];
    //. tell subscribers
  }


  //----------------------------------------------------------------------
  // queries
  //----------------------------------------------------------------------

  getNode(id: NodeId): INode {
    return this.getCacheNode(id);
  }

  // find nodes that match query shape - all values must match
  // warning: results are unordered - if want ordered children use getChildren
  getNodes(pattern: Pattern = {}): INode[] {
    const nodes = this.getCacheNodes();
    const matches = nodes.filter(node => {
      return Object.keys(pattern).every(key => pattern[key] === node[key]); // AND all matches together
    });
    return matches;
  }


  //----------------------------------------------------------------------
  // parent-child relations
  //----------------------------------------------------------------------
  //. move to parentChild.js, which will add methods to Neomem.prototype

  //. needed this so could call this.addChild, which is in another file
  addChild(nodeId: NodeId, parentId: NodeId) {}  
 
}


//----------------------------------------------------------------------
// mobx decorations
//----------------------------------------------------------------------

decorate(NeomemBase, {

  initializing: observable,
  setInitializing: action,

  cache: observable,

  currentNodeId: observable,
  setCurrentNodeId: action,

  currentUserId: observable,
  setCurrentUserId: action,

  // values
  setNodeValue: action,
  deleteNodeValue: action,

  // nodes
  createNode: action,
  // deleteNode: action,

});

