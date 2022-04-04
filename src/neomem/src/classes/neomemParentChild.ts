// parent-child relations

import { decorate, observable, action } from 'mobx';
import { INode, NodeId } from '../types';
// import { Auth, User, UserId, Cache, INode, NodeId, NodeValue, Pattern, Props } from '../types';
// import { Datastore } from '../datastores/types';


export const NeomemParentChild = (SuperClass: any) => class extends SuperClass {

  // recursively delete down the parent child relations
  async deleteNode(nodeId: NodeId): Promise<void> {
    console.log('deletenode', nodeId);
    const node = this.getNode(nodeId);
    const childIds = node.childIds as string;
    const childIdArray = childIds ? childIds.split(',') : [];
    for await (let childId of childIdArray) {
      await this.deleteNode(childId);
    }
    return await this.deleteNodeNorecurse(nodeId);
  }
  
  // remove a node from the store
  deleteNodeNorecurse(nodeId: NodeId): void {
    // remove from parent-child relation, if any
    this.removeChild(nodeId);
    // remove from cache
    this.deleteCacheNode(nodeId);
    // notify subscribers
    // const node = this.getCacheNode(nodeId);
    // if (!node.system) {
    // this.notify('delete', nodeId);
    this.db.deleteNode(nodeId);
    // }
  }


  // add a child to parent, if parent specified and exists
  // returns array of child nodes
  // addChild(childId: NodeId, parentId: NodeId, beforeId: NodeId|undefined = undefined) {
  //   const child = this.getNode(childId);
  //   const parent = this.getNode(parentId);
  //   const beforeIndex = beforeId ? parent.children.findIndex(child => child.id === beforeId) : -1;
  //   if (beforeIndex >= 0) {
  //     parent.children.splice(beforeIndex, 0, child);
  //   } else {
  //     parent.children.push(child);
  //   }
  //   child.parentId = parent.id;
  //   child.depth = (parent.depth || 0) + 1;
  //   console.log(`added child ${child.id} to ${parentId} before ${beforeIndex}`);
  //   console.log('child', child);
  //   console.log(parent.children);
  //   this.notify('addChild', childId, parentId, beforeId);
  //   return parent.children;
  // }

  // add child to end of parent's children list
  // see also moveChild
  addChild(childId: NodeId, parentId: NodeId): void {
    console.log('addchild', childId, parentId);
    const child = this.getNode(childId);
    const parent = this.getNode(parentId);

    // remove from current place if any
    this.removeChild(childId);

    // set parent properties
    const childIds = parent.childIds as string | undefined;
    const childIdArray = childIds ? childIds.split(',') : [];
    childIdArray.push(childId);
    const newChildIds = childIdArray.join(',');
    parent.childIds = newChildIds;

    // set child properties
    const depth = (parent.depth as number || 0) + 1;
    child.parentId = parentId;
    child.depth = depth;

    // tell db
    if (!child.system) {
      this.db.setNodeValue(parentId, 'childIds', newChildIds);
      this.db.setNodeValues(childId, { parentId, depth });
    }
  }

  // remove child from parent
  removeChild(childId: NodeId): void {
    const oldParent = this.getParent(childId);
    if (oldParent) {
      console.log('removechild', childId, oldParent);
      // oldParent.children = oldParent.children.filter(child => child.id !== childId);
      const childIds = oldParent.childIds as string | undefined;
      const childIdArray = childIds ? childIds.split(',') : [];
      const newChildIdArray = childIdArray.filter(id => id !== childId);
      const newChildIds = newChildIdArray.join(',');
      oldParent.childIds = newChildIds;
      const child = this.getNode(childId);
      if (!child.system) {
        // this.db.removeChild(child, oldParent);
        this.db.deleteNodeValue(childId, 'parentId');
        this.db.setNodeValue(oldParent.id, 'childIds', newChildIds);
      }
    }
  }

  moveChild(fromId: NodeId, toId: NodeId): void {
    window.alert('movechild not implemented yet');
  }

  // // move a child node - put in place of given node
  // moveChild(fromId: NodeId, toId: NodeId): void {
  //   //. if same parents handle one way
  //   const fromParent = this.getParent(fromId);
  //   const toParent = this.getParent(toId);
  //   if (fromParent && fromParent === toParent) {
  //     // const fromIndex = fromParent.children.findIndex(child => child.id === fromId);
  //     let toIndex = fromParent.children.findIndex(child => child.id === toId);
  //     const child = this.getNode(fromId);
  //     this.removeChild(fromId);
  //     fromParent.children.splice(toIndex, 0, child);
  //     console.log(fromParent.children);
  //   } else {
  //     console.log(fromId, toId, fromParent, toParent);
  //   }
  // }

  // // get list of ordered child Nodes of parent
  // // cf getNodes({parentId}), which is unordered
  // getChildren(parentId: NodeId): Node[] {
  //   const parent = this.getNode(parentId);
  //   return parent ? parent.children : []; //. ? this should be 'welcome' etc - ie all top-level nodes - could use getNodes in that case? or welcome should be child of root node?
  // }

  getChildren(parentId: NodeId): INode[] {
    const s = this.getNodeValue(parentId, 'childIds') as string | undefined;
    const childIds = s ? s.split(',') : [];
    const children = childIds.map(id => this.cache[id]);
    return children;
  }

  // get ordered tree of children Nodes recursively
  // hierarchy is implicit in each node's depth property
  getTree(parentId: NodeId): INode[] {
    let tree: INode[] = [];
    const node = this.getNode(parentId);
    if (node) tree.push(node);
    const children = this.getChildren(parentId);
    if (children) {
      children.forEach(child => {
        tree = tree.concat(this.getTree(child.id)); // recurse
      });
    }
    return tree;
  }

  //. would want this or similar to handle the doc view
  //. note that this assumes a tree structure - so goes under parent-child reln fns?
  getTreeText(nodeId: NodeId): string {
    let text = "";
    const lf = "\n";
    const line = "--------------------------------------------------------------------------------";
    //. will want to retrieve all data from db, not just that in cache. ie fill cache first.
    const nodes = this.getTree(nodeId);
    nodes.forEach(node => {
      const indent = '='.repeat(node.depth as number || 0)
      let section = '';
      section += line + lf;
      section += indent + ' ' + node.name + ' ' + indent + lf;
      section += line + lf;
      section += "Type: " + (node.typeId || '') + lf;
      section += "Notes: " + (node.notes || '') + lf;
      section += lf + lf;
      text += section;
    });
    return text;
  }

  hasChildren(parentId: NodeId): boolean {
    return this.getChildren(parentId).length > 0;
  }

  getParent(childId: NodeId): INode | undefined {
    const child = this.getNode(childId);
    const parent = child.parentId ? this.getNode(child.parentId as string) : undefined;
    return parent;
  }

  getSiblings(id: NodeId): INode[] {
    const parent = this.getParent(id);
    const siblings = parent ? this.getChildren(parent.id) : [];
    return siblings;
  }


}

decorate(NeomemParentChild, {
  addChild: action,
  removeChild: action,
  moveChild: action,
});
