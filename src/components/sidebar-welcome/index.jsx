import React from 'react';
import './styles.css';

export default () => {
  return (
    <div className="sidebar-welcome">
      <h2 className="sidebar-welcome-title">
        Welcome to TripPlanner
      </h2>
      <div className="sidebar-welcome-description">
        Add a place to the map with the searchbox, and reorder places by dragging and dropping the names.
        {/* <br /><br />
        That's it! */}
        <br /><br />
        {/* Optionally, you can create an account to save your work to the cloud - click Signup above. */}
        You can create an account to save your work to the cloud - click Signup above.
      </div>
    </div>
  );
};
