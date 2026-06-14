import React from 'react';
import { observer } from "mobx-react-lite";
import './styles.css';
import { useNeomem } from '../application';

export default observer(() => {
  const neomem = useNeomem();
  return (
    <div className="view-profile">
      <div className="view-profile-title">
        PROFILE
      </div>
      <div>
        name: {neomem.user.name}
      </div>
      <div>
        nodes: {neomem.user.nodes.length}
        {/* nodes: {neomem.user.getNodes().length} */}
      </div>
      <ul>
        {neomem.user.nodes.map(node => (
          <li key={node.id}>
            {node.name}
          </li>
        ))}
      </ul>
    </div>
  );
});
