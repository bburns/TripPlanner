import React from 'react';
import { observer } from 'mobx-react-lite';
import NavTree from '../nav-tree';
import Sidebar from '../sidebar';
import ViewMap from '../view-map';
import './styles.css';

// returns a fragment <> so will work with flex display
export default observer(() => {
  return (
    <>
      <NavTree />
      <ViewMap />
      <Sidebar />
    </>
  );
});
