# Neomem

A simple graph database

## Goals

- make graph database - define nodes and edges (objects and relations)
- use as a cache between a data source and a user interface
- should come with plain Node object and Child/Parent relations
- plugins for different data sources, or a standard interface for data sources to implement?
- standard callback interface for user and prog interfaces to receive events
- plugins to add domain types and relations (eg Book, Author, Wrote/WrittenBy)
- allow different ui's - e.g. web/React, console, jsui (the direct JavaScript interface). console ui would be like Zork - wander around graph of 'rooms', examine properties and contents, edit them, add more.


## Todo

- pull out into a reusable npm package
- remove mobx stuff - let the ui add that onto the store with decorate fn?
- have folder of backend plugins to interact with different data sources? filesys, firestore, envars, whatnot
