```js

cloud = new FirestoreDb()

// users

cloud.getUser('brian') // undefined - not in users collection
cloud.createUser({id:'brian'}) // writes document to users collection
cloud.getUser('brian') // {id:'brian'} - gets from users collection

cloud.getCurrentUserId() // undefined
cloud.setCurrentUserId('brian')  // or setUser or signin ?
cloud.getCurrentUserId() // brian  or {id:'brian'}
cloud.setCurrentUserId() // signout



await cloud.saveUserObject({id:'test',name:'TestUser'}) // adds doc to firestore

user = await cloud.getUserObject('test')

// user signed in - tell db their id so it knows where to get data
cloud.signin('test')



// await cloud.getNode('welcome') // there? no - that's part of tp
// await cloud.getNode('action') // no - part of neomem!

// see what's in there - should be empty
await cloud.getNodes()

// make some nodes
trip1 = await cloud.createNode({id:'trip1', typeId:'trip'})
austin = await cloud.createNode({id:'austin', typeId:'place'})

// show nodes
await cloud.getNodes()

// get a single node
await cloud.getNode('trip1')

// delete a node
cloud.deleteNode('austin')


// query
await cloud.getNodes({typeId:'trip'})

// modify a node
cloud.setNodeValue('trip1', 'description', "kjnfkdjnrt")

// get single value
cloud.getNodeValue('trip1', 'description')

// check update
cloud.getNode('trip1')



// signout
cloud.signout()

// cleanup
cloud.deleteUser('brian')


```
