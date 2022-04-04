// menu
// provides a menu that slides out from left or right side

import React, { useState, useEffect } from 'react';
import menuIcon from './images/menu.svg';
import './styles.css';


export default ({ children, name="menu", side="left", image=menuIcon }) => {

  const [open, setOpen] = useState(false); // start closed
  const closeMenu = () => setOpen(false);
  const toggleMenu = () => setOpen(open => !open);
  // const toggleDropdown = () => document.getElementById("profile-dropdown").classList.toggle("show");

  const handleWindowClick = e => {
    if (!document.getElementById(name).contains(e.target)){
      closeMenu(); // clicked outside the menu, so close it
    }
  };

  useEffect(() => {
    window.addEventListener('click', handleWindowClick);
    return () => window.removeEventListener('click', handleWindowClick);
  }, []);

  // const style = (side === 'left') ?
  //   {
  //     'left': open ? '0px' : '-12em',
  //   } : {
  //     'right': open ? '0px' : '-12em',
  //   };
  const style = { 'display': open ? 'block' : 'none' };

  return (
    <span className="menu" id={name}>
      <span className="menu-button" onClick={toggleMenu}>
        <img src={image} alt="" />
      </span>
      <div style={style} className="menu-contents" onClick={closeMenu}>
        {/* <span className="menu-close" onClick={closeMenu}>x</span> */}
        {children}
      </div>
    </span>
  );
};
