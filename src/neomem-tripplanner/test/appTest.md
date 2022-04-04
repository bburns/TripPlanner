```js


// app = new App(nm)

app.getNodes() // should have base and domain ontology, incl welcome. instant because it's from nm cache

app.addTrip('trip1') //. error - welcome not in localstorage - why need it? should be in nm cache?
app.addPlace('austin')


// app.createNode({id:'seattle'})
// app.createNode({id:'austin'})
// app.createNode({id:'trip1'})
// app.addChild('austin','trip1')
// app.addChild('seattle','trip1')
// app.addChild('trip1','welcome')

app.handleAuthChange() // signout
app.handleAuthChange({uid:'brian'})


// app.signin('zoey0') // is dumping the ontology to the db - why/where?

// make sure db doesn't have ontology



app.getNodes() // just the base ontology - where is app ontology?


// app.currentNodeId = 'welcome'
// app.setCurrentNodeId('welcome')
neomem.setCurrentNodeId('welcome')






```