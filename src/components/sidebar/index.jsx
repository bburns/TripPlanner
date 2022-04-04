import React from 'react';
import { observer } from 'mobx-react-lite';
import SidebarWelcome from '../sidebar-welcome';
import SidebarDetails from '../sidebar-details';
import SidebarHelp from '../sidebar-help';
import SidebarLinks from '../sidebar-links';
import SidebarDonate from '../sidebar-donate';
import SidebarProps from '../sidebar-props';
import SidebarAd from '../sidebar-ad';
import { useNeomem } from '../application';
import './styles.css';
import flag from '../../assets/images/flag-light.svg';
import flags from '../../assets/images/flags3-light.svg';


const typeIcons = {
  // home: FaHome,
  // home: <img src={home} alt=""/>,
  trip: <img src={flags} alt="" />,
  place: <img src={flag} alt=""/>,
};


export default observer(() => {

  const neomem = useNeomem();
  if (neomem.initializing) return null;

  // node type will determine what panes to show
  const currentNodeId = neomem.currentNodeId;
  const currentNode = neomem.getNode(currentNodeId);
  const typeId = currentNode.typeId;
  const typeIcon = typeId ? typeIcons[typeId] : null;
  const viewIds = typeId ? neomem.getNodeValue(typeId, 'viewIds') : '';
  const viewIdArray = viewIds.split(',');
  const show = {
    title: currentNodeId !== 'welcome',
  };
  viewIdArray.forEach(viewId => show[viewId] = true);
  const help = typeId ? neomem.getNodeValue(typeId, 'help') : '';

  const SidebarTitle = observer(() => (
    <div className="sidebar-title">
      <h2>
        {/* <span>{typeIcon}</span> */}
        <span>{currentNode.name}</span>
      </h2>
    </div>
  ));

  return (
    <div className="sidebar">
      <div className="sidebar-top">
        {show.welcome && <SidebarWelcome />}
        {show.title && <SidebarTitle />}
        {show.help && <SidebarHelp help={help} />}
        {show.details && <SidebarDetails />}
        {show.links && <SidebarLinks />}
        {show.props && <SidebarProps />}
      </div>
      <div className="sidebar-bottom">
        {show.ad && <SidebarAd />}
        {show.donate && <SidebarDonate />}
      </div>
    </div>
  );
});
