// firestore
// low-level api to interface with the firestore db

// the only assumptions it makes about the data are that there is a user object with a `nodes` collection,
// and each node document has an id:string field.


import { User, UserId, INode, NodeId, NodeValue, Pattern } from '../../types';
import { Datastore } from '../types';
import { Firebase, Firestore, Path, Collection, Document } from './types';


export class FirestoreDb implements Datastore {

  type = 'FirestoreDb';
  firebase: any;
  firestore: Firestore;
  // userId: UserId | undefined;
  currentUserId: UserId | undefined;

  constructor(firebase: Firebase) {
    this.firebase = firebase;
    this.firestore = firebase.firestore();
    // this.currentUserId = undefined;
  }


  // -----------------------------------------------------
  // users
  // -----------------------------------------------------

  // get user object from db, or undefined if not there
  async getUser(userId: UserId): Promise<User | undefined> {
    const path = `users/${userId}`;
    console.log('firestore:getuser', path);
    const snapshot = await this.firestore.doc(path).get();
    const user = snapshot.data() as User; // will be undefined if doc not there
    return user;
  }

  // save user object to db
  // note: don't really need to save id to db, but can't save an empty object
  async createUser(user: User): Promise<User> {
    const path = `users/${user.id}`;
    await this.firestore.doc(path).set(user); // note: promise resolves to void
    return user;
  }

  // can be undefined
  getCurrentUserId() {
    return this.currentUserId;
  }

  // pass nothing for signout
  setCurrentUserId(userId?: UserId) {
    this.currentUserId = userId;
  }

  // note: this doesn't delete the associated collections - must do manually.
  // see https://firebase.google.com/docs/firestore/manage-data/delete-data
  // could implement that here, but for the moment simpler to do from up above - see neomem:deleteUser.
  async deleteUser(userId: UserId) {
    const path = `users/${userId}`;
    await this.firestore.doc(path).delete();
  }

  
  // -----------------------------------------------------
  // nodes
  // -----------------------------------------------------

  async createNode(node: INode): Promise<INode> {
    if (this.currentUserId) {
      console.log('db create node', node);
      const path = `users/${this.currentUserId}/nodes/${node.id}`;
      const obj = { ...node };
      await this.firestore.doc(path).set(obj);
    }
    return node;
  }

  // async createNodes(nodes: INode[]): Promise<Inode[]> {
  // }

  async saveNodes(nodes: INode[]): Promise<INode[]> {
    if (this.currentUserId) {
      for (let node of nodes) {
        this.createNode(node);
      }
    }
    return nodes;
  }

  async deleteNode(nodeId: NodeId): Promise<void> {
    if (this.currentUserId) {
      const path = `users/${this.currentUserId}/nodes/${nodeId}`;
      await this.firestore.doc(path).delete();
    }
  }

  async getNode(nodeId: NodeId): Promise<INode> {
    const path = `users/${this.currentUserId}/nodes/${nodeId}`;
    const snapshot = await this.firestore.doc(path).get();
    const node = snapshot.data();
    return node;
  }

  // get list of nodes in db format
  // pattern can be eg {typeId:'place'}, {parentId:'welcome'}, combinations, etc
  async getNodes(pattern: Pattern = {}): Promise<INode[]> {
    const path: Path = `users/${this.currentUserId}/nodes/`;
    const collection: Collection = this.firestore.collection(path);
    // eg const query = collection.where('typeId', '==', 'action');
    let query = collection;
    for (let key of Object.keys(pattern)) {
      const value = pattern[key];
      query = query.where(key, '==', value);
    }
    const snapshot: Document[] = await query.get();
    const nodes: INode[] = [];
    snapshot.forEach(doc => { // note: no .map available
      const node = doc.data();
      node.id = doc.id; // store the id in the object also - convenient for the ui
      nodes.push(node);
    });
    return nodes;
  }

 
  async getNodeValue(nodeId: NodeId, fieldId: NodeId): Promise<NodeValue> {
    const path = `users/${this.currentUserId}/nodes/${nodeId}`;
    //.. do restricted query to just get the field needed - save bandwidth, eg if had a huge description field
    const snapshot = await this.firestore.doc(path).get();
    const node = snapshot.data();
    return node[fieldId];
    // const node = this.getNode(nodeId);
    // return node[fieldId];
  }


  async setNodeValue(nodeId: NodeId, fieldId: NodeId, value: NodeValue): Promise<void> {
    if (this.currentUserId) {
      const values = { [fieldId]: value };
      // const path = `users/${this.currentUserId}/nodes/${nodeId}`;
      // await this.firestore.doc(path).set(values, { merge: true });
      this.setNodeValues(nodeId, values);
    }
  }

  async setNodeValues(nodeId: NodeId, values: object): Promise<void> {
    if (this.currentUserId) {
      const path = `users/${this.currentUserId}/nodes/${nodeId}`;
      await this.firestore.doc(path).set(values, { merge: true });
    }
  }

  async deleteNodeValue(nodeId: NodeId, fieldId: NodeId) {
    if (this.currentUserId) {
      const path = `users/${this.currentUserId}/nodes/${nodeId}`;
      await this.firestore.doc(path).update({
        [fieldId]: this.firebase.firestore.FieldValue.delete(),
      });
    }
  }

}
