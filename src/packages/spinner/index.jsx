// Spinner
// Show a spinner gif, centered over a div

import React from 'react';
import spinnerGif from './spinner.gif'; // 3kb
import './styles.css';


const Spinner = () => (
  <img
    src={spinnerGif}
    className="spinner"
    alt=""
  />
);

export default Spinner;
