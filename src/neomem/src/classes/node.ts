import { decorate, observable } from 'mobx';
import { INode, NodeId, NodeValue, Props } from '../types';


//. make an interface that plugins can implement also for their own classes, eg Trip, Place
//. maybe this should be a BareNode or BaseNode class, with just id? maybe __id__, in case plugins want to use id?

export class Node implements INode {

  id: NodeId;

  // define types for some known (optional) fields
  //. need to make some observable? name, description, depth?
  name?: string;
  // description?: string;
  // typeId?: string;
  // parentId?: NodeId;
  // childIds?: string;
  // depth?: number;
  // system?: boolean;

  // and let user add anything they want to nodes - lose type safety though
  [index: string]: NodeValue;

  constructor(props: Props) {
    this.id = getRandomId(10); // see below
    Object.keys(props).forEach(key => this[key] = props[key]);
  }
}

decorate(Node, {
//   parentId: observable,
  name: observable,
//   // children: observable,
});


// get a random id
// we could use 8 loweralphanum digits, which gives plenty of space for (local) objects
// 8 loweralphanums = 36^8 ~ 10^12.5 ~ 2^42.3 > 1 trillion
// 10 loweralphanums = 36^10 ~ 10^15 ~ 2^49.5
// 11 loweralphanums = 36^11 ~ 10^17.1 ~ 2^56.4 <-- not valid - won't fit in 53 bits! (see below)
// cf Firestore Ids which are 20 fullalphanums = 62^20 ~ 10^35.8 ~ 2^118.1
// cf UUIDs which are 32 fullalphanums = 62^32 ~ 10^57.2 ~ 2^188.8
// note: Number.MAX_SAFE_INTEGER = 9007199254740991 ~10^15.9 ~ 2^53
// that's because javascript stores integers as floats, so 
// double precision numbers - binary64 	Double precision 	2^53 = 10^15.95 (uses 11 bits for exponent)
function getRandomId(len = 10): NodeId {
  // const id = String(Math.floor(Math.random() * 1000000000000)); // 1 trillion = 12 digits
  // const arr = new Uint8Array(len / 2); // store len/2 bytes, as each byte will be 2 digits
  // const cryptoObj = window.crypto || window.msCrypto; // for IE 11
  // cryptoObj.getRandomValues(arr); // fills array with values
  // const id = Array.from(arr, dec2hex).join(''); // convert each byte to string 00-ff, join them together
  // see https://stackoverflow.com/questions/1349404/generate-random-string-characters-in-javascript
  console.assert(len <= 10); // max of 10 for Math.random method
  // const id = Math.random().toString(36).slice(-len);
  // once got an id like ".ag928tuz" - it included the decimal point. so replace that with zeros -
  const id = Math.random().toString(36).replace('0.','0000000000').slice(-len);
  return id;
}
