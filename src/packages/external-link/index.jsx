// external link
// show a link with an exit icon

import React from 'react';
import './styles.css';

// onClick={props.handleClick}
// id={props.id}

export default ({href, children}) => {
  return (
    <a
      className="external-link"
      href={href}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  );
};
