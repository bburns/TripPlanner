import React from 'react';
import { observer } from 'mobx-react-lite';
import { useNeomem } from '../application';
import './styles.css';


export default observer(() => {

  const neomem = useNeomem();
  const node = neomem.getNode(neomem.currentNodeId);

  if (!node) {
    return null;
  }

  const handleEnter = (event) => {
    event.preventDefault();
    const form = event.target.elements; // dict of elements
    const name = event.target.name;
    const value = form[name].value;
    alert('enter ' + name + ': ' + value);
    // dispatch(store.actions.setNodeValue(node, name, value));
    node.setNodeValue(name, value);
  };

  //. works for everything except if you click on another place - why?
  const handleBlur = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    alert('blur ' + name + ': ' + value);
    // dispatch(store.actions.setNodeValue(node, name, value));
    node.setNodeValue(name, value);
  };

  const PropString = ({ id, name, value, handleBlur, placeholder }) => (
    <div className="sidebar-prop-string">
      <span>{name}</span>
      <input type="text" placeholder={placeholder} id={id} name={id} defaultValue={value} onBlur={handleBlur} />
    </div>
  );

  const PropText = ({ id, name, value, handleBlur, placeholder }) => (
    <div className="sidebar-prop-text">
      <div>{name}</div>
      <textarea placeholder={placeholder} id={id} name={id} defaultValue={value} onBlur={handleBlur} />
    </div>
  );

  return (
    <div className="sidebar-props">
      <div className="sidebar-props-title">
        {node.name}
      </div>
      {/* note: need the key value so will re-render when click on different nodes */}
      <form className="sidebar-props-form" onSubmit={handleEnter} key={node.id} >
        {/* <PropString id="id" key="id" value={node.id} handleBlur={handleBlur} /> */}
        {/* <PropString id="name" key="name" value={node.name} handleBlur={handleBlur} /> */}
        <PropText id="notes" key="notes" name="Notes" value={node.notes} handleBlur={handleBlur} placeholder="Enter notes here..." />
      </form>
    </div>
  );
});
