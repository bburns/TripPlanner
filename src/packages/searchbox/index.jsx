// searchbox
// an autocomplete searchbox for google places
//@flow

import React, { useState } from 'react';

// for example code see https://github.com/hibiken/react-places-autocomplete/blob/master/demo/components/SearchBar.js
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
// import poweredByGoogle from './images/poweredByGoogle.png'; //. must put somewhere?
import './styles.css';


// autocomplete options
// see https://developers.google.com/maps/documentation/javascript/reference/places-autocomplete-service#AutocompletionRequest
const searchOptions = {
  // You may restrict results from a Place Autocomplete request to be of a certain type by passing a types parameter.
  // The types of predictions to be returned. For a list of supported types, see the developer's guide. 
  // If nothing is specified, all types are returned. In general only a single type is allowed. 
  // The exception is that you can safely mix the 'geocode' and 'establishment' types, 
  // but note that this will have the same effect as specifying no types.
  // types: Array<string>
  // supported types - https://developers.google.com/places/supported_types#table3
  // types: ['address'],
  //. how get all the other info?

  // eg these options will bias the autocomplete predictions toward Sydney, Australia with a radius of 2000 meters,
  // and limit the results to addresses only
  // location: new maps.LatLng(-34, 151),
  // radius: 2000,
  // types: ['address'],
}

export default (props) => {

  // props - addPlace(place={name,lat,lng}), placeholder text (optional)

  const placeholder = props.placeholder || "Enter a place...";

  const [address, updateAddress] = useState('');
  const handleChange = (address) => updateAddress(address);
  const handleClear = () => updateAddress('');

  const handleKeyDown = (event) => {
    if (event.key === 'Escape' || event.key === 'Esc') {
      updateAddress('');
      document.getElementById('blurme').blur();
      document.getElementById('blurme').focus();
    }
  };

  // NOTE: `placeId` is null when user hits Enter key with no suggestion item selected.
  // const handleSelect = (address: string, placeId: ?string) => {
  const handleSelect = async (address, placeId) => {
    try {
      // see https://developers.google.com/maps/documentation/javascript/geocoding
      const results = await geocodeByAddress(address);
      // result:{
      //   address_components:[{},{},],
      //   formatted_address:string,
      //   geometry:{bounds,location,viewport}, 
      //   place_id:string, types:[]
      // }
      const result = results[0];
      console.log(result);
      const { lat, lng } = await getLatLng(result); // {lat,lng}
      const centerStr = `${lat},${lng}`;
      // see https://developers.google.com/maps/documentation/javascript/reference/coordinates#LatLngBounds
      // const bounds = result.geometry.bounds.toString(); // eg "((38.7916449, -77.119750000003), (38.995548, -76.909393))"
      // often has too many digits, so truncate the numbers -
      let boundsStr = null;
      if (result.geometry.bounds) { // not there for points of interest
        const ne = result.geometry.bounds.getNorthEast();
        const sw = result.geometry.bounds.getSouthWest();
        const n = ne.lat();
        const e = ne.lng();
        const s = sw.lat();
        const w = sw.lng();
        boundsStr = `${n.toFixed(6)},${e.toFixed(6)},${s.toFixed(6)},${w.toFixed(6)}`;
      }
      console.log(boundsStr);
      updateAddress(''); // clear searchbox
      // const place = {name: address, lat, lng, placeId, bounds};
      const place = {name: address, placeId, centerStr, boundsStr};
      console.log('new place', place);
      props.addPlace(place); // call callback with new place object
    } catch (error) {
      console.error("Error", error);
    }
  };

  const handleError = (status, clearSuggestions) => {
    console.log('Error from Google Maps API', status);
    clearSuggestions();
  };

  const renderSearchbox = ({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
    <>
      <input
        autoFocus
        {...getInputProps({ placeholder, className: "searchbox-input" })}
        id="blurme"
      />
        {/* onKeyDown={handleKeyDown} */}
      {/* {address.length > 0 && (
        <button className="searchbox-clear-button" onClick={handleClear}>&times;</button>
      )} */}
      {(suggestions.length > 0) &&
        <div className="searchbox-dropdown">
          {suggestions.map(suggestion => {
            const className = suggestion.active
              ? "searchbox-item--active"
              : "searchbox-item";
            return (
              <div {...getSuggestionItemProps(suggestion, { className })} >
                {/* {suggestion.description} */}
                <span className="suggestion-main">
                  {suggestion.formattedSuggestion.mainText}
                </span>{' '}
                <span className="suggestion-secondary">
                  {suggestion.formattedSuggestion.secondaryText}
                </span>
              </div>
            );
          })}
          {/* <div className="searchbox-footer">
            <img
              src={poweredByGoogle}
              className="searchbox-footer-image"
            />
          </div> */}
        </div>
      }
    </>
  );
  
  return (
    <span className="searchbox" id="searchbox">
      <PlacesAutocomplete
        value={address}
        onChange={handleChange}
        onSelect={handleSelect}
        onError={handleError}
        searchOptions={searchOptions}
        highlightFirstSuggestion
      >
        {renderSearchbox}
      </PlacesAutocomplete>
    </span>
  );
};
