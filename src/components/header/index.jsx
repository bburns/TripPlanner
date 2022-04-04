import React from 'react';
import { Link } from "react-router-dom";
import { observer } from "mobx-react-lite";

import Searchbox from '../../packages/searchbox';
import HeaderMenu from '../header-menu';
import logo from '../../assets/images/logo-flag.svg';
import './styles.css';
import { useNeomem } from '../application';
import flags from '../../flags';


export default observer(() => {

  const neomem = useNeomem();
  const { tripPlanner } = neomem.plugins;

  const addPlace = (place) => {
    tripPlanner.addPlace(place);
  };

  return (
    <div className="header">
    
      <span className="header-left">
    
        <Link to="/" className="header-brand">
          <span className="header-logo">
            <img src={logo} />
          </span>
          <h1 className="header-title">
            {process.env.REACT_APP_NAME}
          </h1>
          <span className="header-version">
            {flags.version}
          </span>
        </Link>
    
      </span>

      <span className="header-searchbox">
        <Searchbox addPlace={addPlace} placeholder="Enter a place (city, state, address, country, point of interest)..." />
      </span>
      
      <HeaderMenu />
    
    </div>
  );
});
