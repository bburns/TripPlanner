import React, { useState } from 'react';
import GoogleMapReact from 'google-map-react';
import { fitBounds } from 'google-map-react/utils';
import { observer } from 'mobx-react-lite';
import { useNeomem } from '../application';
import { useGlobals } from '../application';
import './styles.css';

// import pin from './images/pin.svg';
// import pin from './images/flag.svg';

// pinsfrom https://sites.google.com/site/gmapsdevelopment/
import pinGreen from './images/mm_20_green.png';
import pinRed from './images/mm_20_red.png';


const keys = { key: process.env.REACT_APP_MAP_KEY };

const mapOptions = {
  fullscreenControl: false,
  // zoomControl: boolean,
  // mapTypeControl: boolean,
  // scaleControl: boolean,
  // streetViewControl: boolean,
  // rotateControl: boolean,
  // bw style --->
  // styles: [{ stylers: [{ 'saturation': -100 }, { 'gamma': 0.8 }, { 'lightness': 4 }, { 'visibility': 'on' }] }],
};
const createMapOptions = (maps) => mapOptions;

// lines and arrows
const color = 'red';
// const color = '#0cf'; // bluegreen
// const color = '#bf3'; // green
// const color = 'blue';
const opacity = 1.0;
const width = 1.5;

// define an arrow svg shape
const base = 3;
const height = 7;
const arrow = {
  path: `M 0,0 ${base},${height} -${base},${height} 0,0 z`, // 0,0 is the tip of the arrow
  fillColor: color,
  fillOpacity: opacity,
  strokeColor: color,
  strokeWeight: 1,
};

// we use this to save marker and line references between renderings
let obj = {};


// eg 'n,e,s,w' -> {ne:{lat,lng},sw:{lat,lng}}
function getBoundsFromString(boundsStr) {
  const arr = boundsStr.split(',').map(Number);
  const bounds = {
    ne: { lat: arr[0], lng: arr[1] },
    sw: { lat: arr[2], lng: arr[3] },
  };
  return bounds;
}

function getEdgesFromString(boundsStr) {
  const bounds = getBoundsFromString(boundsStr);
  const edges = {north: bounds.ne.lat, east: bounds.ne.lng, south: bounds.sw.lat, west: bounds.sw.lng };
  return edges;
}

function getCenterFromString(centerStr) {
  const arr = centerStr.split(',').map(Number);
  const center = { lat: arr[0], lng: arr[1] };
  return center;
}

function getCenterZoom(boundsStr, centerStr, size) {
  if (boundsStr) {
    const corners = getBoundsFromString(boundsStr);
    let { center, zoom } = fitBounds(corners, size);
    // if (centerStr) {
    //   center = getCenterFromString(centerStr);
    // }
    return { center, zoom };
  } else if (centerStr) {
    const center = getCenterFromString(centerStr);
    const zoom = 12;
    return { center, zoom };
  }
  const center = { lat: 35, lng: -90 };
  return { center, zoom: 4 };
}


export default observer(() => {

  // local state
  const [map, setMap] = useState(null);
  const [maps, setMaps] = useState(null);

  // access global data store with list of places
  const neomem = useNeomem();
  const globals = useGlobals();
  // const neomem = app.neomem; //. for now...
  if (neomem.initializing) return null;
  // const currentNodeId = app.currentNodeId; //. mobx being weird, had to use this
  const currentNodeId = neomem.currentNodeId; //. mobx being weird, had to use this
  const currentNode = neomem.getNode(currentNodeId);
  if (!currentNode) return null; // bail if initializing

  //. what else does this receive?
  const handleApiLoaded = ({ map, maps }) => {
    setMap(map);
    setMaps(maps);
    // make google maps api avail in other parts of ui, eg sidebar
    //. might not want to handle this way ?
    // app.setMapReferences(maps, map);
    globals.map = map;
    globals.maps = maps;
  };

  //. could use this to update trip's view, but if wrote to firestore every time would be expensive.
  //. so write every n times though?
  const handleChange = ({ bounds }) => {
    // { bounds: {ne, nw, se, sw}, center: {lat, lng}, marginBounds, size: {height px, width px}, zoom: Number }
    // console.log(p);
    // console.log(bounds);
  };

  const removeNode = (id) => neomem.deleteNode(id);

  // get list of places
  // const places = neomem.getChildren(currentNodeId);
  // const places = neomem.getChildren(currentNodeId).filter(place => place.lat && place.lng);
  // const places = neomem.getChildren(currentNodeId).filter(place => !!place.centerStr);
  // const places = neomem.getTree(currentNodeId);
  // const places = neomem.getTree(currentNodeId).filter(place => !!place.centerStr);
  // const places = currentNodeId==='welcome' ? [] : neomem.getTree(currentNodeId).filter(place => !!place.centerStr);

  let places;
  if (currentNodeId === 'welcome') { //. buh
    places = [];
  } else if (neomem.hasChildren(currentNodeId)) {
    places = neomem.getChildren(currentNodeId);
  } else {
    places = neomem.getSiblings(currentNodeId);
  }

  //. get centers and bounds for each place here? or in ORM?
  places.forEach(place => {
    if (place.boundsStr) place.bounds = getBoundsFromString(place.boundsStr);
    if (place.centerStr) {
      place.center = getCenterFromString(place.centerStr);
      //. assign here for lines - bad - do in that fn
      place.lat = place.center.lat;
      place.lng = place.center.lng;
    }
  });

  // this makes a closure on maps, map, markers
  //. better would be do a diff - then no flickering
  const drawMarkers = (places) => {
    const infobox = new maps.InfoWindow(); //. memory leak? re-use single infowindow?
    const newMarkers = places && places.map((place, index) => {
      const marker = new maps.Marker({
        // position: { lat: place.lat, lng: place.lng },
        position: place.center,
        map,
        title: place.name,
        icon: (place.id === currentNodeId) ? pinGreen : pinRed,
        // draggable: true,
        // scale: 1.5, // nowork?
        // scaledSize: new maps.Size(38, 38), // nowork
      });
      // const content = `
      //   <div class="infobox">
      //     <div class="infobox-name">${place.name}</div>
      //     <div class="infobox-remove">Remove</div>
      //   </div>
      // `;
      //. could we use react to render?
      marker.addListener('click', function () {
        const content = document.createElement('div');
        const name = document.createElement('div');
        const remove = document.createElement('div');
        content.className = 'infobox';
        name.className = 'infobox-name';
        remove.className = 'infobox-remove';
        name.innerText = place.name;
        remove.innerText = 'Remove';
        // remove.addEventListener('click', () => removePlace(index));
        // remove.addEventListener('click', () => removeNode(place.path));
        remove.addEventListener('click', () => removeNode(place.id));
        content.appendChild(name);
        content.appendChild(remove);
        infobox.setContent(content);
        infobox.open(map, marker);
      });
      return marker;
    });
    if (obj.markers) {
      obj.markers.forEach(marker => marker.setMap(null)); // remove old markers
    }
    return newMarkers;
  };

  // this makes a closure on maps, map, lines
  const drawLines = (places) => {
    // see https://stackoverflow.com/questions/31305497/how-to-draw-an-arrow-on-every-polyline-segment-on-google-maps-v3
    const newLines = [];
    if (places) {
      for (let i = 0; i < places.length - 1; i++) {
        const line = new maps.Polyline({
          path: places.slice(i, i + 2),
          strokeColor: color,
          strokeOpacity: opacity,
          strokeWeight: width,
          icons: [{
            // icon: { path: maps.SymbolPath.FORWARD_CLOSED_ARROW },
            icon: arrow,
            offset: '100%', // 100% means at end of line segment
          }]
        });
        line.setMap(map);
        newLines.push(line);
      }
    }
    if (obj.lines) {
      obj.lines.forEach(line => line.setMap(null)); // remove old lines
    }
    return newLines;
  };


  // if map loaded, draw the current places
  let center = { lat: 35, lng: -90 };
  let zoom = 4;
  if (maps && map) {

    // get view
    // const { center, zoom } = store.selectors.getView(state);
    // const { center, zoom } = ui.view;
    // const size = { width: 800, height: 600 }; // map size in pixels - //. measure /////////////////////.....
    const mapdiv = document.getElementById('map');
    if (mapdiv) {
      const size = { width: mapdiv.offsetWidth, height: mapdiv.offsetHeight };
      console.log(mapdiv, size);
      const view = getCenterZoom(currentNode.boundsStr, currentNode.centerStr, size);
      console.log(view);
      center = view.center;
      zoom = view.zoom;  
    }

    const newMarkers = drawMarkers(places);
    const newLines = drawLines(places);
    obj.markers = newMarkers && [...newMarkers];
    obj.lines = newLines && [...newLines];

    map.setZoom(zoom);
    map.panTo(center);

    //. any way to get smooth panning/zooming?
    // seems to only do it if place is already on screen, eg within nyc
    // if (currentNode.boundsStr) {
    //   const edges = getEdgesFromString(currentNode.boundsStr);
    //   console.log(edges);
    //   map.setZoom(zoom);
    //   map.panToBounds(edges);
    // } else if (center) {
    //   map.setZoom(zoom);
    //   map.panTo(center);
    // } else {
    //   //. pan to bounds of all descendents
    // }
  }

  // need both id and class for map
  return (
    <div className="map" id="map">
      <GoogleMapReact
        bootstrapURLKeys={keys}
        defaultCenter={center}
        defaultZoom={zoom}
        onChange={handleChange}
        options={createMapOptions}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={handleApiLoaded}
      >
        {/* {props.places.map((place, i) => (
          <div
            className="map-marker"
            key={place.name + i}
            text={place.name}
            lat={place.lat}
            lng={place.lng}
          >
            <img src={marker} alt="" />
          </div>
        ))} */}
      </GoogleMapReact>
    </div>
  );
});
