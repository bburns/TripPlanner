// auth
// wrapper around firebase auth module

// type Handler = any;
// type Provider = 'Google' | 'Facebook' | 'Anonymous' | 'Email';
// type Method = 'in' | 'up';
// type Info = { email: string, password: string, confirmPassword: string | undefined };


export default class Auth {

  constructor(firebase) {
    this.firebase = firebase;
    this.auth = firebase.auth();
  }

  // onChange(handler) {
  addListener(handler) {
    console.log('auth addlistener called - register signin/out handler', handler);
    return this.auth.onAuthStateChanged(handler);
  }

  signOut() {
    this.auth.signOut();
  }

  // sign in or up using various providers
  // returns user object or null
  async signInUp(provider, method, info) {
    console.log(provider, method, info);
    let result = null;
    try {
      switch (provider) {
        case 'Google': {
          const provider = new this.firebase.auth.GoogleAuthProvider();
          // provider.addScope('profile');
          // provider.addScope('email');
          result = await this.auth.signInWithPopup(provider);
          // result = await firebase.auth().signInWithRedirect(provider);
          break;
        }
        case 'Facebook': {
          const provider = new this.firebase.auth.FacebookAuthProvider();
          // provider.addScope('profile');
          // provider.addScope('email');
          result = await this.auth.signInWithPopup(provider);
          break;
        }
        case 'Anonymous': {
          result = await this.auth.signInAnonymously();
          break;
        }
        case 'Email': {
          const { email, password, confirmPassword } = info;
          if (method === 'in') {
            result = await this.auth.signInWithEmailAndPassword(email, password);
          } else {
            if (password !== confirmPassword) {
              alert("Passwords must match!");
              return;
            }
            result = await this.auth.createUserWithEmailAndPassword(email, password);        
          }
          break;
        }
        default: {
          throw new Error('Unknown signin method');
        }
      }
    } catch (error) {
      // error has { code, message, email, credential }
      // alert(JSON.stringify(error));
      // alert(error.message); // can be email invalid, password too short, etc
      // alert(error.message); // can be invalid password, etc
      console.error(error);
      alert(error.message);
      return null;
    }
    // return result;
    // result has { accessToken, user }
    const user = result.user; // this object has all kinds of info in it, including .uid, a unique user id
    return user;
  }

}
