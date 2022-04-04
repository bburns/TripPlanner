// App
// main application component

import React, { useEffect } from 'react';
import { createContext, useContext } from 'react';
// import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import { configure, decorate, observable, action } from 'mobx';
import { observer } from 'mobx-react-lite';
import 'normalize.css'; // make ui consistent across browsers

import { FirebaseServices, firebase } from '../../services';
import { Neomem } from '../../neomem/src'; //. will be from 'neomem' once it's a package
import { FirestoreDb } from '../../neomem/src';
import { LocalStorageDb } from '../../neomem/src';
import Header from '../header';
import RouteHome from '../route-home';
import RouteProfile from '../route-profile';
import RouteSigninup from '../route-signinup';
import { TripPlanner } from '../../neomem-tripplanner';
import './styles.css';
import flags from '../../flags';


// all mobx state modifications should be done through @action methods
configure({ enforceActions: 'observed' });


// initialize neomem and plugins
const firebaseServices = new FirebaseServices();
const auth = firebaseServices.auth;
const cloud = new FirestoreDb(firebase);
const local = new LocalStorageDb();
const neomem = new Neomem(cloud, local, auth);
const tripPlanner = new TripPlanner();
neomem.addPlugin(tripPlanner); //. or pass the class?


//. for console debugging
window.TripPlanner = TripPlanner;
window.Neomem = Neomem;
window.tp = tripPlanner;
window.nm = neomem;
window.cloud = cloud;
window.local = local;
window.db = neomem.db; // cloud or local
window.auth = auth;


// define context to provide neomem instance to all components through useNeomem fn
export const NeomemContext = createContext(null);
const NeomemProvider = ({ children }) => {
  return (
    <NeomemContext.Provider value={neomem}>
      {children}
    </NeomemContext.Provider>
  );
};
// define custom hook - just say const app = useNeomem();
export function useNeomem() {
  return useContext(NeomemContext);
}


// define global context to provide global data to all components through useGlobals
const globals = {
  map: undefined,
  maps: undefined,
};
export const GlobalsContext = createContext(null);
const GlobalsProvider = ({ children }) => {
  return (
    <GlobalsContext.Provider value={globals}>
      {children}
    </GlobalsContext.Provider>
  );
};
// define custom hook - just say const globals = useGlobals();
export function useGlobals() {
  return useContext(GlobalsContext);
}


//. cleanup - had to pull this out so could use context inside the store provider and router...
const Top = observer(() => {

  // subscribe to login changes
  //. need to do => otherwise `this` isn't set right - why?
  // [] means just do after loading
  // useEffect(() => app.auth.onChange(userToken => app.handleAuthChange(userToken)), []);
  // useEffect(() => auth.addListener(userToken => app.handleAuthChange(userToken)), []);
  useEffect(() => auth.addListener(userToken => neomem.handleAuthChange(userToken)), []);

  if (flags.downForMaintenance) {
    return <div>Down for maintenance...</div>;
  }

  return (
    <Router>
      <Header />
      <div className="app-contents">
        <Switch>
          <Route path="/signin" exact component={RouteSigninup} />
          <Route path="/signup" exact component={RouteSigninup} />
          <Route path="/profile" exact component={RouteProfile} />
          {/* <Route path="/terms" exact component={RouteTerms} /> */}
          {/* <Route path="/privacy" exact component={RoutePrivacy} /> */}
          <Route path="/" exact component={RouteHome} />
        </Switch>
      </div>
    </Router>
  );
});

export default () => (
  <NeomemProvider> {/* provides neomem to all descendents via useNeomem() */}
    <GlobalsProvider> {/* provides globals to all descendents via useGlobals() */}
      <Top />
    </GlobalsProvider>
  </NeomemProvider>
);

