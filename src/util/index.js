export { useForceRefresh } from './react';


// remove one element from an array
// returns a new array
// const removeElement = (arr, i) => [...arr.slice(0, i), ...arr.slice(i + 1)];
export function removeElement(arr, i) {
  if (i === undefined || i < 0 || i >= arr.length) throw new Error("bad index");
  return [...arr.slice(0, i), ...arr.slice(i + 1)];
}

// replace element in an array
// returns a new array
export function replaceElement(arr, i, el) {
  if (i === undefined || i < 0 || i >= arr.length) throw new Error("bad index");
  return [...arr.slice(0, i), el, ...arr.slice(i+1)];
}


export function findNodeById(arr, id) {
  const i = arr.findIndex(el => el.id === id);
  return i;
}

export function removeNodeById(arr, id) {
  // const i = arr.findIndex(el => el.id === id);
  // if (i === -1) throw "nodeId not found " + id;
  // return removeElement(arr, i);
  return arr.filter(el => el.id !== id);
}


// reorder a list
export function reorderList(arr, from, to) {
  // console.log('reorder', arr, from, to);
  if (from < 0 || from >= arr.length) throw Error("bad index");
  if (to < 0 || to >= arr.length) throw Error("bad index");
  const result = Array.from(arr);
  // console.log(result);
  const [removed] = result.splice(from, 1);
  // console.log(removed);
  result.splice(to, 0, removed);
  // console.log(result);
  return result;
}

// reorder a list in place
export function reorderListInPlace(arr, from, to) {
  if (from < 0 || from >= arr.length) throw Error("bad index");
  if (to < 0 || to >= arr.length) throw Error("bad index");
  const [removed] = arr.splice(from, 1);
  arr.splice(to, 0, removed);
}

// // reorder a list
// export function reorderList(list, fromId, toId) {
//   const result = Array.from(list);
//   const [removed] = result.splice(from, 1);
//   result.splice(to, 0, removed);
//   return result;
// }

// get last part of a string following a delimiter
export function getLastPart(s, delim) {
  const i = s.lastIndexOf(delim);
  return (i === -1) ? s : s.slice(i+1);
}
