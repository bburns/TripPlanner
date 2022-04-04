export const ontology: object[] = [
  { 
    id: 'type',
    typeId: 'type',
    name: 'Type',
    description: "A type definition.",
    system: true,
  },
  { 
    id: 'relation',
    typeId: 'type',
    name: 'Relation',
    description: "A relation definition.",
    system: true,
  },
  { 
    id: 'node',
    typeId: 'type',
    name: 'Node',
    description: "A generic node. This type is implied if no typeId is specified.",
    system: true,
  },
  { 
    id: 'parent-child',
    typeId: 'relation',
    name: 'Parent-child relation',
    description: "A simple parent-child relation, ordered. Stored via parentId and children fields.",
    system: true,
  },
];
