import React from 'react';
import { observer } from 'mobx-react-lite';
import { useNeomem } from '../application';
import './styles.css';

export default observer(({help}) => {
  const neomem = useNeomem();
  if (neomem.initializing) return null;
  // const neomem = app.neomem;
  // const nodeId = app.currentNodeId;
  // const help = neomem.getNodeValue(nodeId, 'help');
  return (
    <div className="sidebar-help">
      {help}
    </div>
  );
});
