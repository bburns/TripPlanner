import {assert, expect} from 'chai';
import * as lib from '.';

// expect toEqual etc is jest-expect syntax
// but jest is wayyyyyy too slow
// so switching to mocha
// which needs some kind of assertion lib
// so trying chai, which has assert or expect syntax (expect(foo).to.equal(bar))

describe("removeElement", function() {
  it("removes first element", function() {
    // expect(lib.removeElement([1,2,3], 0)).toEqual([2,3]);
    expect(lib.removeElement([1,2,3], 0)).to.deep.equal([2,3]);
    // assert(lib.removeElement([1,2,3], 0).equal([2,3]));
  });
  it("removes middle element", function() {
    // expect(lib.removeElement([1,2,3], 1)).toEqual([1,3]);
    expect(lib.removeElement([1,2,3], 1)).to.deep.equal([1,3]);
  });
  it("removes last element", function() {
    // expect(lib.removeElement([1,2,3], 2)).toEqual([1,2]);
    expect(lib.removeElement([1,2,3], 2)).to.deep.equal([1,2]);
  });
  it("has bad index", function() {
    // expect(() => lib.removeElement([1,2,3], undefined)).toThrow();
    expect(() => lib.removeElement([1,2,3], undefined)).to.throw();
  });
});

describe("removeNodeById", function() {
  let arr;
  beforeEach(function() {
    arr = [{id:1},{id:2},{id:3}];
  });
  it("removes first element", function() {
    // expect(lib.removeNodeById(arr, 1)).toEqual([{id:2},{id:3}]);
    expect(lib.removeNodeById(arr, 1)).to.deep.equal([{id:2},{id:3}]);
  });
});


describe("reorderList", function() {
  let arr;
  beforeEach(function() {
    arr = [{id:1},{id:2},{id:3}];
  });
  it("moves from end to start", function() {
    // expect(lib.reorderList(arr, 2, 0)).toEqual([{id:3},{id:1},{id:2}]);
    expect(lib.reorderList(arr, 2, 0)).to.deep.equal([{id:3},{id:1},{id:2}]);
  });
  it("moves from start to end", function() {
    // expect(lib.reorderList(arr, 0, 2)).toEqual([{id:2},{id:3},{id:1}]);
    expect(lib.reorderList(arr, 0, 2)).to.deep.equal([{id:2},{id:3},{id:1}]);
  });
});



