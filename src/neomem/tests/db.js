// a simple mock db/subscriber

//. use lodash?

import { Subscriber } from '..';

export class Db {

  nodes = {};
  foobar;
  pokpok;
  // constructor() {
  //   super();
  // }

  //. setUser, getUser ? these are the root of the dbs - each is a separate silo of nodes

  add(id, obj) {
    this.nodes[id] = {...obj};
  }

  get(id) {
    // console.log('get',id,this.nodes);
    return this.nodes[id];
  }

  delete(id) {
    delete this.nodes[id];
  }

  setNodeValue(id, name, value) {
    this.nodes[id][name] = value;
  }

  // child relations

  addChild(childId, parentId, beforeId=null) {
    // const n = this.nodes[parentId];
    // if (n.children === undefined) n.children = [];
    // n.children.push({...child});
  }

  getChildren(parentId) {
    const n = this.nodes[parentId];
    return n.children;
  }

  removeChild(childId) {
    // const n = this.nodes[parentId];
    // n.children = util.removeNodeById(n.children, childId);    
  }

  moveChild(fromId, parentId, beforeId) {
    // const n = this.nodes[parentId];
    // const fromIndex = util.findNodeById(n.children, fromId);
    // const toIndex = util.findNodeById(n.children, toId);
    // util.reorderListInPlace(n.children, fromIndex, toIndex);
  }

}

