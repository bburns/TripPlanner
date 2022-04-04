import { App } from './app';
import { Firebase } from '../cloud/firebase';
import { LocalStorageDb } from './localStorageDb';
import { Neomem } from '../neomem/src';


const firebase = new Firebase(); // firebase module with auth, firestore objects
const auth = firebase.auth;
const cloud = firebase.db;
const local = new LocalStorageDb();
const neomem = new Neomem(cloud, local);
const app = new App(neomem);
app.signinAnonymousUser();

// const p = (...args) => console.log(...args);
// const xp = (...args) => {}; // ignore print

describe("app", () => {
  it("do good", async () => {

    //----------------------------------------------------------------------

    const nodes = app.getNodes();
    // const trip1 = app.addTrip('trip1');
    // const austin = app.addPlace('austin', trip1.id);
    // const boston = app.addPlace('boston', trip1.id);
    const trip1 = app.addTrip({name:'trip1'});
    const austin = app.addPlace({name:'austin', parentId: trip1.id});
    const boston = app.addPlace({name:'boston', parentId: trip1.id});
    const tree = app.getTree('welcome');

    expect(nodes.length).toBeGreaterThan(20);
    expect(trip1.name).toEqual('trip1');
    expect(austin.parentId).toEqual(trip1.id);
    expect(boston.parentId).toEqual(trip1.id);
    expect(tree.length).toEqual(4);

    //----------------------------------------------------------------------

    //. will interact with firestore db - so clean up before/when done
    
    // on signin it should create a user in the db and save all the work done so far
    const user = {id:'zoey'};
    const user2 = await app.signinNewUser(user);
    const user3 = await app.neomem.getCloudUser(user.id);
    const nodes2 = app.getNodes();
    const tree2 = app.getTree('welcome');
    const userId = app.getCurrentUserId();

    expect(user2).toEqual(user);
    expect(user3).toEqual(user);
    expect(nodes2.length).toBeGreaterThan(20);
    expect(tree2.length).toEqual(4);
    expect(userId).toEqual(user.id);

    //----------------------------------------------------------------------

    app.signout();
    const userId2 = app.getCurrentUserId();
    const tree3 = app.getTree('welcome');

    expect(userId2).toBeUndefined();
    expect(tree3.length).toEqual(1);

    //----------------------------------------------------------------------

    const user4 = await app.signinExistingUser(user);
    const tree4 = app.getTree('welcome');
    app.signout();

    expect(tree4.length).toEqual(4);

    //----------------------------------------------------------------------

    // cleanup
    // note: deleting a user doesn't delete its collections (ie nodes)!
    // see https://firebase.google.com/docs/firestore/manage-data/delete-data#collections
    // will need to keep in mind for deleting a trip or place
    const nodes3 = app.getNodes({system:undefined});
    await app.deleteNode('welcome'); // will recurse down parentchild relations
    const nodes4 = app.getNodes({system:undefined});
    await app.deleteUser(user.id);
    const user5 = await app.neomem.getCloudUser(user.id);
    console.log(user5);

    expect(nodes3.length).toEqual(1);
    expect(nodes4.length).toEqual(0);
    expect(user5).toBeUndefined(); //. fail - why? deleted it

  });
});


