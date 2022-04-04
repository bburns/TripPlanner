// firebase services

import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

import { config } from './config';
import Auth from './auth';

export { Auth };
export { firebase };

export class FirebaseServices {
  constructor() {
    console.log('init firebase');
    firebase.initializeApp(config);
    this.auth = new Auth(firebase);
  }
}

