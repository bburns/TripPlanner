export const ontology = [

  // types
  {
    id: 'home',
    name: 'Home',
    typeId: 'type',
    system: true,
    description: "Home type",
    // actionIds: 'addTrip,addFolder,-,treeView,tableView,docView,-,downloadData',
    actionIds: 'addTrip,downloadData',
    viewIds: 'welcome,donate',
  },
  {
    id: 'folder',
    name: 'Folder',
    typeId: 'type',
    system: true,
    description: "A folder for organizing trips.",
    actionIds: 'addTrip,-,editNotes,renameNode,deleteNode',
  },
  {
    id: 'trip',
    name: 'Trip',
    typeId: 'type',
    system: true,
    description: "A trip with a set of places.",
    actionIds: 'editNotes,renameNode,deleteNode,downloadData',
    viewIds: 'help,links',
    help: "Enter a place in the searchbox above and hit Enter to add it to your trip.",
  },
  {
    id: 'place',
    name: 'Place',
    typeId: 'type',
    system: true,
    description: "A place - can contain other places.",
    actionIds: 'editNotes,moveLeft,moveRight,deleteNode',
    viewIds: 'details,links',
  },
  {
    id: 'action',
    name: 'Action',
    typeId: 'type',
    system: true,
    description: "A user-interface action, associated with different types.",
  },

  // actions
  {
    id: 'addTrip',
    name: 'Add Trip',
    typeId: 'action',
    system: true,
    description: "Add a new trip to contain places",
  },
  {
    id: 'addFolder',
    name: 'Add Folder',
    typeId: 'action',
    system: true,
    description: "Add a new folder to contain and organize trips",
  },
  {
    id: 'editNotes',
    name: 'Edit Notes...',
    typeId: 'action',
    system: true,
    description: "Edit notes associated with this item",
  },
  {
    id: 'renameNode',
    name: 'Rename...',
    typeId: 'action',
    system: true,
    description: "Rename this item",
  },
  {
    id: 'deleteNode',
    name: 'Delete...',
    typeId: 'action',
    system: true,
    description: "Delete this item",
  },
  {
    id: 'treeView',
    name: 'View as Tree',
    typeId: 'action',
    system: true,
    description: "View all data in tree form (default)",
  },
  {
    id: 'tableView',
    name: 'View as Table',
    typeId: 'action',
    system: true,
    description: "View all data in table form, like a spreadsheet",
  },
  {
    id: 'docView',
    name: 'View as Doc',
    typeId: 'action',
    system: true,
    description: "View all data in document form",
  },
  {
    id: 'downloadData',
    name: 'Download Data...',
    typeId: 'action',
    system: true,
    description: "Download all data to a text file",
  },
  {
    id: 'showAllNotes',
    name: 'Show All Notes',
    typeId: 'action',
    system: true,
    description: "Show all notes in this tree view",
  },
  {
    id: 'moveLeft',
    name: 'Move Left',
    typeId: 'action',
    system: true,
    description: "Dedent this item one level",
  },
  {
    id: 'moveRight',
    name: 'Move Right',
    typeId: 'action',
    system: true,
    description: "Indent this item one level",
  },

  // nodes
  {
    id: 'welcome',
    name: 'Welcome',
    typeId: 'home',
    // system: true, // needs to be in user space, else we lose the childIds field!
    depth: 0,
  },

];
