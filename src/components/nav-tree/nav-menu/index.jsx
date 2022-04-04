import React, { useState, useEffect } from 'react';
import menuIcon from './images/menu.svg';
import { useNeomem } from '../../application';
// import { GoKebabHorizontal, GoThreeBars, GoChevronUp, GoFile, GoLinkExternal, GoX, GoTrashcan } from "react-icons/go";
import './styles.css';


export default ({ children, placeId, name, image=menuIcon }) => {

  const neomem = useNeomem();
  if (neomem.initializing) return null;
  const [open, setOpen] = useState(false); // start closed
  const closeMenu = () => setOpen(false);
  const toggleMenu = () => {
    neomem.setCurrentNodeId(placeId);
    setOpen(open => !open); //. this doesnt get called if had clicked on a different node's menu btn
  };

  const handleWindowClick = e => {
    // if (!document.getElementById(name).contains(e.target)) {
    const menu = document.getElementById(name)
    // console.log(name, menu, e.target);
    if (!menu.contains(e.target)) {
      closeMenu(); // clicked outside the menu, so close it
    }
  };

  useEffect(() => {
    window.addEventListener('click', handleWindowClick);
    return () => window.removeEventListener('click', handleWindowClick);
  }, []);

  // const style = (side === 'left') ?
  //   {
  //     left: open ? '0px' : '-12em',
  //   } : {
  //     right: open ? '0px' : '-12em',
  //   };

  // set popup menu at the edge of the navbar
  const nav = document.getElementsByClassName('nodes');
  const navWidth = nav && nav[0] && nav[0].offsetWidth || 0;
  const style = {
    display: open ? 'inline' : 'none',
    left: String(navWidth) + 'px',
  };

  return (
    <span className="nav-menu" id={name}>
      <span className="nav-menu-button" role="button" onClick={toggleMenu} title="Click for menu">
        <img src={image} alt="" />
      </span>
      <span style={style} className="nav-menu-contents" onClick={closeMenu}>
        {children}
      </span>
    </span>
  );
};
