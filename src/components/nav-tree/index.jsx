// nav-tree
// show hierarchy of nodes in side pane

import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
// import { toJS } from 'mobx';
import { observer } from "mobx-react-lite";
import fileDownload from 'js-file-download';
import {
  GoFile,
  GoLinkExternal,
  GoX,
  GoCloudDownload,
  GoFileDirectory,
  GoPencil,
  GoChevronLeft,
  GoChevronRight,
  GoCheck,
  GoPlus,
  GoTerminal,
  GoTrashcan,
  GoChevronDown,
  GoChevronUp,
} from "react-icons/go";
import { FaHome } from 'react-icons/fa';
import { IoMdArrowBack } from 'react-icons/io';
import { IoMdArrowForward } from 'react-icons/io';
import './styles.css';
import DialogText from '../../packages/dialog-text';
import NavMenu from './nav-menu';
import { useNeomem } from '../application';
// import { useForceRefresh } from '../../util';
import iconHome from '../../assets/images/home.svg';
import iconFlag from '../../assets/images/flag.svg';
import iconFlags from '../../assets/images/flags3.svg';
import iconLeft from '../../assets/images/indent-left.png';
import iconRight from '../../assets/images/indent-right.png';
import flags from '../../flags';


const typeIcons = {
  // home: <img src={home} alt=""/>,
  // trip: <img src={flags} alt="" />,
  // place: <img src={flag} alt=""/>,
};


export default observer(() => {

  const neomem = useNeomem();
  const { tripPlanner } = neomem.plugins;

  
  //----------------------------------------------------------------------
  // handle notes
  //----------------------------------------------------------------------

  // must define state here before any possible exits
  const [notesOpen, setNotesOpen] = useState(false);
  // const toggleNotesOpen = () => setNotesOpen(notesOpen => !notesOpen);
  const showNotes = () => setNotesOpen(true);
  const handleOkay = (value) => {
    neomem.setNodeValue(currentNodeId, 'notes', value);
    setNotesOpen(false);
  };
  const handleCancel = () => {
    setNotesOpen(false);
  };

  // const forceRefresh = useForceRefresh();

  // const [menuOpen, setMenuOpen] = useState(false);
  // const showMenu = () => setMenuOpen(true);
  // const hideMenu = () => setMenuOpen(false);

  //----------------------------------------------------------------------
  // get app state
  //----------------------------------------------------------------------

  if (neomem.initializing) return null;
  const currentNodeId = neomem.currentNodeId; //. mobx being weird, had to use this
  const currentNode = neomem.getNode(currentNodeId); // .name is getter/setter, as expected
  console.log(currentNodeId, currentNode);

  //----------------------------------------------------------------------
  // get list of nodes
  //----------------------------------------------------------------------

  //. note this gets called each time an element is added to the tree, eg in loading,
  // so get progressively more elements in array - bad
  const places = neomem.getTree('welcome'); //.
  window.places = places; //. for debug

  //----------------------------------------------------------------------
  // define actions
  //----------------------------------------------------------------------

  // const selectNode = (id) => app.setCurrentNodeId(id);
  const selectNode = (id) => neomem.setCurrentNodeId(id);

  const removeNode = (id) => {
    const node = neomem.getNode(id);
    if (window.confirm(`Remove ${node.name}?`)) {
      const parent = neomem.getParent(id);
      neomem.setCurrentNodeId(parent.id);
      neomem.deleteNode(id);
    }
  };

  const moveChild = (fromId, toParentId, beforeId) => neomem.moveChild(fromId, toParentId, beforeId);

  const onDragEnd = (result) => {
    if (result.destination) {
      console.log(result);
      const fromIndex = result.source.index;
      const toIndex = result.destination.index;
      const fromNode = places[fromIndex];
      const toNode = places[toIndex];
      const fromId = fromNode.id;
      const toId = toNode.id;
      moveChild(fromId, toId);
    }
    // else dropped outside the list
  };

  const addTrip = () => {
    const trip = tripPlanner.addTrip();
    neomem.setCurrentNodeId(trip.id);
  };

  const editNotes = (id) => {
    showNotes();
  };

  const renameNode = (id) => {
    const oldName = neomem.getNodeValue(id, 'name') || '';
    const newName = window.prompt(`Enter new name for '${oldName}':`, oldName);
    if (newName) {
      neomem.setNodeValue(id, 'name', newName); //. nowork
      // currentNode.name = newName; // nowork
      // neomem.setNodeName(id, newName);
      // forceRefresh(); // works but just for this component, not sidebar
    }
  };

  const deleteNode = (id) => {
    removeNode(id);
  };

  const downloadData = (id) => {
    const text = neomem.getTreeText(id);
    fileDownload(text, 'TripPlannerData.txt');
  };

  const moveLeft = () => {
    alert('left');
  };
  const moveRight = () => {
    alert('right');
  };


  const doAction = (e, actionId, nodeId) => {
    // e.stopPropagation(); // stop bubbling - otherwise original node gets selected again right after action
    const action = actionHandlers[actionId];
    action(nodeId);
  };

  //----------------------------------------------------------------------
  // define actions
  //----------------------------------------------------------------------

  // maps actionIds to icons
  const actionIcons = {
    addFolder: <GoFileDirectory />,
    addTrip: <img src={iconFlags} alt=""/>,
    deleteNode: <GoX />,
    downloadData: <GoCloudDownload />,
    editNotes: <GoFile />,
    // moveLeft: <GoChevronLeft />,
    // moveRight: <GoChevronRight />,
    // moveLeft: <img src={indentLeft} alt="" />,
    // moveRight: <img src={indentRight} alt="" />,
    moveLeft: <IoMdArrowBack />,
    moveRight: <IoMdArrowForward />,
    renameNode: <GoPencil />,
  };

  // maps actionIds to functions
  const actionHandlers = { addTrip, editNotes, renameNode, deleteNode, downloadData, moveLeft, moveRight };


  //----------------------------------------------------------------------
  // components
  //----------------------------------------------------------------------

  // modal notes dialog
  const NotesDialog = () => (
    <DialogText
      isOpen={notesOpen}
      title={currentNode ? ("Notes for " + currentNode.name) : ''}
      defaultValue={currentNode ? currentNode.notes : ''}
      handleOkay={handleOkay}
      handleCancel={handleCancel}
    />
  );

  // notes panel at bottom of navtree
  const NotesPanel = observer(() => (
    <>
      {currentNode && currentNode.depth > 0 &&
        <div className="nodes-notes">
          <div className="nodes-notes-header">
            <span className="nodes-notes-title">Notes</span>
            <span className="nodes-notes-buttons">
              <span className="nodes-notes-open" onClick={showNotes} title="Edit in dialog">
                <GoLinkExternal />
              </span>
            </span>
          </div>
          <div className="nodes-notes-text">
            <textarea name="notes" id="notes" defaultValue={currentNode.notes} />
          </div>
        </div>
      }
    </>
  ));

  const getNodeClass = (place, isDragging) => {
    // somehow mobx wasn't detecting ui.currentNodeId buried down in here - had to pull it out as another var up top.
    return "node" + (place.id === currentNodeId ? " selected" : "") + (isDragging ? " dragging" : "") + (place.typeId === 'trip' ? " trip" : "");
  };

  const Node = observer(({ place, index }) => {
    console.log('render Node', place.name);
    const typeId = neomem.getNodeValue(place.id, 'typeId');
    const typeIcon = typeId ? typeIcons[typeId] : null;
    const actionIds = typeId ? neomem.getNodeValue(typeId, 'actionIds') : '';
    const actionIdArray = actionIds ? actionIds.split(',') : [];
    const actions = actionIdArray.map(id => neomem.getNode(id));
    return (
      <Draggable key={place.id} draggableId={place.id} index={index}>
        {(provided, snapshot) => (
          <>
            {/* className could be eg 'node selected dragging' */}
            <div
              className={getNodeClass(place, snapshot.isDragging)}
              data-indent={place.depth}
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              style={provided.draggableProps.style}
              onClick={() => selectNode(place.id)}
            >
              <span className="node-icon">
                {typeIcon}
              </span>
              <span className="node-name" title={place.name}>
                {place.name}
              </span>
              {/* need stop propagation so menu gets triggered - otherwise just selects the node */}
              <span className="node-menu" onClick={(e) => e.stopPropagation()}>
                <NavMenu placeId={place.id} name={"node-menu-" + place.id}>
                  {actions.map((action, index) => (
                    <div key={action.id + String(index)} onClick={(e) => doAction(e, action.id, place.id)}>
                      <span className="action-icon">{actionIcons[action.id] || ' '}</span>
                      <span className="action-name" title={action.description}>{action.name}</span>
                    </div>
                  ))}
                </NavMenu>
              </span>
              {flags.showNotesInline && place.notes &&
                <div className="node-notes">
                  {place.notes.slice(0, 30)}
                </div>
              }
            </div>
          </>
        )}
      </Draggable>
    );
  });

  // this is a bit complex but is how you implement a draggable list.
  // basic structure is like
  // <div className="places">
  //   {places.map => <div className="place">{place.name}</div>}
  // </div>
  return (
    <div className="nodes">
      <div className="nodes-header">
        {/* <span className="nodes-header-title">
          Welcome
        </span> */}
        {/* <span className="nodes-header-buttons">
          <span className="nodes-header-tree" title="Show tree view">
            <GoFile />
          </span>
          <span className="nodes-header-grid" title="Show grid view">
            <GoFile />
          </span>
          <span className="nodes-header-doc" title="Show document view">
            <GoFile />
          </span>
        </span> */}
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="droppable">
            {(provided, snapshot) => (
              <div className="node-list" {...provided.droppableProps} ref={provided.innerRef} >
                {places && places.map((place, index) => {
                  return <Node place={place} index={index} key={place.id} data-indent={place.depth} />;
                })}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
      {flags.showNotesInNav && <NotesPanel /> }
      <NotesDialog />
    </div>
  );
});
