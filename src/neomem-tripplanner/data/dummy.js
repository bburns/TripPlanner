// define some dummy data

export const dummy = [

  {
    id:'trip1',
    name:'Austin-NYC 2019',
    parentId: 'welcome',
    typeId: 'trip',
    notes: `could fly to ohio, rent van or rv, see george innesses along the way east/se/ne, nyc, will, boston, lisa, maine, canada, algonquin?, niagara falls, ohio

google list of NE sites - https://goo.gl/maps/3QbuQgtVCX32 
`
  },

  {
    boundsStr: "30.5169,-97.5684,30.0987,-97.9384",
    centerStr: "30.267153,-97.7430608",
    children: [],
    depth: 1,
    id: "austin",
    name: "Austin, TX",
    parentId: "trip1",
    placeId: "ChIJLwPMoJm1RIYRetVp1EtGm10",
    typeId: "place",
  },

  {
    boundsStr: null,
    centerStr: "34.1825958,-93.0689888",
    children: [],
    depth: 1,
    id: "arkadelphia",
    name: "Hampton Inn Arkadelphia, Malvern Road, Arkadelphia, AR",
    parentId: 'trip1',
    placeId: "ChIJdZ14bD3fMoYRvvwYdl_fDOY",
    notes: `(cancel midnight 07/18)
  Phone: 1-870-403-0800
  Turn R onto 7 south, then L onto Malvern
  Indoor pool
  Wendy's & Taco Bell south, McDonalds N&W
  Cracker Barrel N of I-30
  `,
    typeId: "place",
  },

  {
    boundsStr: "42.3271,-80.5182,38.4034,-84.8203",
    centerStr: "40.4172871,-82.907123",
    children: [],
    depth: 1,
    id: "oh",
    name: "Ohio",
    parentId: "trip1",
    placeId: "ChIJwY5NtXrpNogRFtmfnDlkzeU",
    typeId: "place",
  },

  {
    boundsStr: "40.9176,-73.7003,40.4774,-74.2591",
    centerStr: "40.7127753,-74.0059728",
    children: [],
    depth: 1,
    id: "nyc",
    name: "NYC, NY",
    parentId: "trip1",
    placeId: "ChIJOwg_06VPwokRYv534QaPC8g",
    typeId: "place",
  },

  {
    boundsStr: null,
    centerStr: "40.7614327,-73.9776216",
    children: [],
    depth: 1,
    id: "moma",
    name: "MoMA, West 53rd Street, NYC, NY",
    parentId: 'nyc',
    placeId: "ChIJKxDbe_lYwokRVf__s8CPn-o",
    typeId: "place",
  },  

  {
    boundsStr: null,
    centerStr: "40.7794366,-73.963244",
    children: [],
    depth: 1,
    id: "met",
    name: "The Metropolitan Museum of Art, 5th Avenue, NYC, NY",
    parentId: "nyc",
    placeId: "ChIJb8Jg9pZYwokR-qHGtvSkLzs",
    typeId: "place",
  },

  {
    boundsStr: "31.0010,-79.9743,24.3963,-87.6349",
    centerStr: "27.6648274,-81.5157535",
    children: [],
    depth: 1,
    id: "fl",
    name: "Florida",
    parentId: "trip1",
    placeId: "ChIJvypWkWV2wYgR0E7HW9MTLvc",
    typeId: "place",
  },

  {
    boundsStr: "30.5169,-97.5684,30.0987,-97.9384",
    centerStr: "30.267153,-97.7430608",
    children: [],
    depth: 1,
    id: "austin2",
    name: "Austin, TX",
    parentId: "trip1",
    placeId: "ChIJLwPMoJm1RIYRetVp1EtGm10",
    typeId: "place",
  },


  //----------------------------------------------------------------------

  {
    id: 'trip2',
    parentId: 'welcome',
    name:'Europe 2020',
    typeId: 'trip',
  },

  {
    boundsStr: "30.5169,-97.5684,30.0987,-97.9384",
    centerStr: "30.267153,-97.7430608",
    children: [],
    depth: 1,
    id: "austin3",
    name: "Austin, TX",
    parentId: "trip2",
    placeId: "ChIJLwPMoJm1RIYRetVp1EtGm10",
    typeId: "place",
  },

  {
    boundsStr: "40.9176,-73.7003,40.4774,-74.2591",
    centerStr: "40.7127753,-74.0059728",
    children: [],
    depth: 1,
    id: "nyc2",
    name: "NYC, NY",
    parentId: "trip2",
    placeId: "ChIJOwg_06VPwokRYv534QaPC8g",
    typeId: "place",
  },

  {
    boundsStr: "67.2466,-12.2388,62.4819,-26.2573",
    centerStr: "64.963051,-19.020835",
    children: [],
    depth: 2,
    id: "iceland",
    name: "Iceland",
    parentId: 'trip2',
    placeId: "ChIJQ2Dro1Ir0kgRmkXB5TQEim8",
    typeId: "place",
  },

];
