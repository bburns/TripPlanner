export { FirebaseServices, firebase } from './firebaseServices';

//. make generic interfaces to cloud services
// could swap out firebase for firebase-api or aws or mongo or a sql db etc

//. pass a provider param like 'firebase/auth', 'firebase/firestore', 'firebase-api/auth', etc and import those needed?
//. and pass in the firebase object initialized with the keys etc. so app is responsible for initializing it.
