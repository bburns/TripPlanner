import React from 'react';
import { NavLink } from "react-router-dom";
import { observer } from "mobx-react-lite";

import person from './images/person.svg';
import Menu from '../../packages/menu';
import './styles.css';
import { useNeomem } from '../application';


export default observer(() => {

  const neomem = useNeomem();
  if (neomem.initializing) return null;

  const handleSignOut = () => {
    // app.auth.signOut();
    neomem.auth.signOut();
    window.location = '#/';
  };

  const loggedIn = neomem.currentUserId !== undefined;

  return (
    <span className="header-menu">
      {!loggedIn && <NavLink className="header-menu-signin" to="/signin">Signin / Signup</NavLink>}
      {loggedIn &&
        <Menu name="header-menu" image={person} side="right">
          {/* <Menu name="header-menu" image={app.user.photo || person} side="right"> */}
          {/* <div><NavLink to="/profile">Profile</NavLink></div> */}
          {/* <div role="button" onClick={handleDownload}>Download...</div> */}
          <div role="button" onClick={handleSignOut}>Signout</div>
        </Menu>
      }
    </span>
  );
});
