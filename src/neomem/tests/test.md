```js

// cloud = new FirestoreDb()
// local = new LocalStorageDb()

nm = new Neomem(cloud, local)
nm.db.type // localStorageDb

//. maybe all the user stuff should be in its own class?
// but diff backends might need it also, eg postgres
// should nm have access to it though?
//. hmm what if it was a plugin class, ie makeType(User) ? and would extend the Neomem class?
// ie would at least be in a separate file that way
// same with Node stuff

await nm.getUser('brian') // {id:'brian'}  all users exist

// this parallels setNodeId, getNodeId ? goto, getLocation? setCurrentNodeId, setCurrentNodeId?
// what state does this change? i guess just .userId - no login occurs
// nm.setUserId('brian')  // or setUser or setCurrentUserId ?
// nm.getUserId() // brian  or {id:'brian'}
// nm.setUserId() // signout
// i think the full setcurrentuserid is clearer as to what it does - and it parallels setcurrentnodeid
nm.setCurrentUserId('brian')  // or setUser or setCurrentUserId ?
nm.getCurrentUserId() // brian  or {id:'brian'}
nm.setCurrentUserId() // signout


nm.getNodes() // []

nm.createNode({id:'trip1'})
nm.createNode({id:'austin'})
nm.addChild('austin','trip1')
nm.getTree('trip1') // has the 2 nodes


nm.


```
