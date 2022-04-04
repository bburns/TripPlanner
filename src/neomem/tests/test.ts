import assert from 'assert';
// var assert = require('assert');
// import assert from 'better-assert';
import { expect } from 'chai';
// var expect = require('chai').expect;
// import * as sinon from 'sinon';

import { Neomem } from '..';
// var Neomem = require('..').Neomem;
import { Db } from './db';
// var Db = require('./db').Db;



describe("Neomem", () => {

  let db: Db;
  let neomem: Neomem;
  foo;
  
  beforeEach(() => {
    db = new Db();
    neomem = new Neomem();
    neomem.addSubscriber(db);
  });


  it("make a node", () => {
    const node = neomem.createNode();
    assert(node.id); // the only thing we'll add to an object
    assert(node.type === undefined);
    // assert(node.parentId === undefined);
    // assert(node.children === undefined); // save memory - most nodes won't have children
    assert(neomem.getNode(node.id) === node);
  });


  it("make a node with CRUD operations", () => {

    // create
    const node = neomem.makeNode({name:'Austin'}); // will create node and add it to the store
    assert(node.id);
    // assert(neomem.getSize() === 1);

    // read
    assert(neomem.getNode(node.id) === node);

    // update
    // need to modify node through neomem so it can alert db, ui etc
    // (unless used proxy objs like mobx)
    neomem.setNodeValue(node.id, 'name', 'Houston');
    assert(neomem.getNodeValue(node.id, 'name'), 'Houston');
    assert(node.name === 'Houston');

    // delete
    neomem.deleteNode(node.id);
    assert(neomem.getNode(node.id) === undefined);
    // assert(neomem.getNodeIds().length === 0);
    assert(node); // we still have the bare node object
  });


  it("add child - to end, to start", () => {
    const parent = neomem.makeNode({id:'parent'});
    const child1 = neomem.makeNode({id:'child1'});
    const child2 = neomem.makeNode({id:'child2'});

    // add child to end of list
    neomem.addChild(child1.id, parent.id);
    const children = neomem.getChildren(parent.id);
    expect(child1.parentId).to.equal(parent.id);
    expect(children).to.deep.equal([child1]);
  });


  // make a flat trip from austin to mtvernon
  it("make a simple trip, move child, remove child", () => {

    const trip = neomem.makeNode({id:'trip', name:'Ohio2019'});

    // this should add them in order
    const austin = neomem.makeNode({id:'austin',parentId:'trip',name:'Austin'});
    const mtvernon = neomem.makeNode({id:'mtvernon',parentId:'trip',name:'Mt Vernon'});
    const nyc = neomem.makeNode({id:'nyc',parentId:'trip',name:'NYC'});

    // check parent.children
    const places = neomem.getChildren('trip');
    expect(places.length).to.equal(3);
    expect(places).to.deep.equal([austin, mtvernon, nyc]);

    // // adding children could be implemented various ways - 
    // // string field on the trip, array on the trip, relation objects in the store
    // neomem.addChild(trip, austin);
    // neomem.addChild(trip, nyc);
    // neomem.addChild(trip, mtvernon);

    // make generic relation objects? then could query either direction, add properties to them, etc
    // neomem.makeRelation(trip,'child',austin);
    // only prob would be adding so much more data to the db - rather have simple rels stored as array or string fields.
    // const trip_austin = neomem.makeChildRelation({parent:trip, child:austin});
    // const trip_mtvernon = neomem.makeChildRelation({parent:trip, child:mtvernon});
    // neomem.add(trip_austin);
    // neomem.add(trip_mtvernon);

    // let places = neomem.getNodes({parentId:'trip'});
    // expect(places.length).to.equal(3);
    // expect(places).to.deep.equal([austin, mtvernon, nyc]);

    // rearrange children

    // move to middle
    // austin mtvernon nyc
    neomem.moveChild('nyc', 'mtvernon'); // move nyc to before mtvernon
    expect(neomem.getChildren('trip')).to.deep.equal([austin, nyc, mtvernon]); // ordered comparison

    // move to end
    neomem.moveChild('austin', 'mtvernon'); // move austin to end
    expect(neomem.getChildren('trip')).to.deep.equal([nyc, mtvernon, austin]);

    // move to start
    neomem.moveChild('austin', 'nyc'); // move austin to before nyc
    expect(neomem.getChildren('trip')).to.deep.equal([austin, nyc, mtvernon]);

    // remove a child
    neomem.removeChild('nyc');
    assert(neomem.getChildren('trip').length===2);
    expect(neomem.getChildren('trip')).to.deep.equal([austin, mtvernon]); // ordered comparison
  });


  // it("make a trip hierarchy, get recursive", () => {
  //   const trip = neomem.makeNode({id:'trip'});
  //   const texas = neomem.makePlace({id:'texas'});
  //   const austin = neomem.makePlace({id:'austin'});
  //   const houston = neomem.makePlace({id:'houston'});
  //   expect(neomem.getChildren(trip.id, recurse=true)).toEqual([austin, houston]);
  // });

});
