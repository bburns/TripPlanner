//. put these all in .env.develop, .env.test, .end.production so can swap out different dbs
// trip-planner-cafe, -develop, -test?
export const config = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: 'tripplanner-bb.firebaseapp.com',
  databaseURL: 'https://tripplanner-bb.firebaseio.com',
  projectId: 'tripplanner-bb',
  storageBucket: 'tripplanner-bb.appspot.com',
  messagingSenderId: '684790275955',
};
