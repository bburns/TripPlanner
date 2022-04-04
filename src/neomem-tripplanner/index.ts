// the trip planner application
// a neomem plugin, independent of any ui code


import * as data from './data';
import flags from './flags';

import { Neomem, INode, Props } from '../neomem/src/types';

//. make this file typescript

// import { IPlugin } from '../neomem/src/types';

//. use some dynamic code to transfer these methods onto Neomem class?
// but dont want plugins to clobber neomem stuff


export class TripPlanner { //implements IPlugin {

  neomem: any;

  constructor() {
  }

  initialize(neomem: Neomem) {
    this.neomem = neomem;
  }

  loadData() {
    this.neomem.load(data.ontology);
    if (flags.loadDummyData) {
      this.neomem.load(data.dummy);
    }
  }

  //. make Trip and Place classes extending INode

  addTrip(props: Props = {}): INode {
    const defaults = {
      name: '(Unnamed trip)',
      typeId: 'trip',
      parentId: 'welcome', //.
    };
    props = { ...defaults, ...props };
    const trip = this.neomem.createNode(props);
    if (trip.parentId) {
      this.neomem.addChild(trip.id, trip.parentId);
    }
    return trip;
  }

  // for console testing passing name+parentid is nice, 
  // but need full props object for react ui
  addPlace(props: Props): INode {
    // find where to add new place

    // if on welcome, add to end of first available trip, else if no trips, create one and add it there
    let parentId;
    if (!props.parentId) {
      let tripId;
      // if (this.currentNodeId === 'welcome') {
      if (this.neomem.currentNodeId === 'welcome') { //.
        let trip = this.getFirstTrip();
        if (!trip) {
          trip = this.addTrip();
        }
        tripId = trip.id;
        parentId = tripId;
      }
    }

    // if (this.neomem.hasChildren(this.currentNodeId)) {
    //   // if selected node has children, add to end of them, else add as sibling
    //   parentId = this.currentNodeId;
    // } else {
    //   parentId = tripId;
    // }
    if (!parentId) {
      // const parent = this.neomem.getParent(this.currentNodeId);
      const parent = this.neomem.getParent(this.neomem.currentNodeId);
      parentId = parent && parent.id;
    }

    //. could make a Trip and Place class like we'd had?
    // const props = {
    //   name: name.replace(', USA', ''),
    //   parentId,
    //   typeId: 'place',
    // };
    props.name = props.name.replace(', USA', '');
    props.parentId = parentId;
    props.typeId = 'place';
    const place = this.neomem.createNode(props); // adds an id, notifies the db also
    this.neomem.addChild(place.id, parentId);
    this.neomem.setCurrentNodeId(place.id);
    return place;
  }

  getFirstTrip(): INode|undefined {
    //. walk down nodes till find a trip and return it, or undefined if none found
    //. get flat list of children of 'welcome'
    const nodes = this.neomem.getTree('welcome');
    for (let node of nodes) {
      if (node.typeId === 'trip') {
        return node;
      }
    }
    return undefined;
  }


}
