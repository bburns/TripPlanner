import React from 'react';
import ReactDOM from 'react-dom';
import Application from './components/application';
import './index.css';


// get tree of react ui elements.
// jsx code like this gets converted to React.createElement calls by Babel -
// those calls then return plain js objects.
const reactElement = (
  <Application />
);

// get #root div
const root = document.getElementById('root');

// render the react elements to the browser dom
ReactDOM.render(reactElement, root);
