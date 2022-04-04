```js


local = new LocalStorageDb()

// users
local.getUser('pok') // {id:'pok'} - always returns the user, as any user can access localstorage
local.createUser({id:'brian'}) // no-op - no need to create users
local.getCurrentUserId() // undefined
local.setCurrentUserId('brian')
local.getCurrentUserId() // brian  or {id:'brian'}
local.setCurrentUserId() // signout

// make some data
local.createNode({id:'foo'})
local.getNodes()

// signin again
local.setCurrentUserId('brian')


```
