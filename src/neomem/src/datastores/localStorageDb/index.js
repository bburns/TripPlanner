// localstoragedb
// low-level api to interface neomem with localstorage

// import { Datastore } from '../types';

//. make typescript, implement an interface or abstract class

export class LocalStorageDb {// implements Datastore {

  type = 'localStorageDb'
  currentUserId;
  nodes = {};

  constructor() {
  }


  // -----------------------------------------------------
  // users
  // -----------------------------------------------------

  // user always exists
  getUser(userId) {
    return {id:userId};
  }

  // no-op
  createUser(user) {
  }

  // no-op
  deleteUser(userId) {
  }


  // these aren't really needed, but they need to be part of cloud db interface
  setCurrentUserId(userId) {
    this.currentUserId = userId;
  }
  getCurrentUserId() {
    return this.currentUserId;
  }


  load() {
    console.log('load from localstorage');
    const s = window.localStorage.getItem('nodes');
    this.nodes = JSON.parse(s);
  }

  save() {
    const s = JSON.stringify(this.nodes);
    console.log('save to localstorage', s);
    window.localStorage.setItem('nodes', s);
  }


  // -----------------------------------------------------
  // nodes
  // -----------------------------------------------------
  // crud - create retrieve update delete

  createNode(node) {
    this.nodes[node.id] = node;
    this.save();
    return node;
  }

  saveNodes(nodes) {
    for (let node of nodes) {
      this.createNode(node);
    }
    return nodes;
  }

  deleteNode(nodeId) {
    delete this.nodes[nodeId];
    this.save();
  }

  getNode(nodeId) {
    const node = this.nodes[nodeId];
    return node;
  }

  // get list of nodes in db format
  // pattern can be eg {typeId:'place'}, {parentId:'welcome'}, combinations, etc
  getNodes(pattern = {}) {
    const nodes = Object.keys(this.nodes).map(id => {
      const node = {... this.nodes[id], id };
      return node;
    })
    return nodes;
  }

  
  //----------------------------------------------------------------------
  // node values
  //----------------------------------------------------------------------

  getNodeValue(nodeId, fieldId) {
    const node = this.nodes[nodeId];
    return node[fieldId];
  }

  setNodeValue(nodeId, fieldId, value) {
    if (this.nodes[nodeId]) {
      this.nodes[nodeId][fieldId] = value;
      this.save();
    }
  }

  setNodeValues(nodeId, obj) {
    for (let key of Object.keys(obj)) {
      this.setNodeValue(nodeId, key, obj[key]);
    }
  }

  deleteNodeValue(nodeId, fieldId) {
    if (this.nodes[nodeId]) {
      delete this.nodes[nodeId][fieldId];
      this.save();
    }
  }

}
