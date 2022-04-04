import React from 'react';
import { observer } from 'mobx-react-lite';
import ExternalLink from '../../packages/external-link';
import './styles.css';

const suggestions = [
  {name: "Hampton Inn"},
  {name: "Holiday Inn Express"},
  {name: "Diamond Mtn National Park"},
  {name: "Hot Springs, Arkansas"},
  {name: "Arkansas History Museum"},
];
const listings = [
  {name: "110 Sixth St, Davis AR"},
  {name: "1200 Pecan St, Hot Springs AR"},
]


export default observer(() => {
  return (
    <div className="sidebar-links">
      <div className="sidebar-links-places">
        <h3>Suggested Places</h3>
        <ul>
          {suggestions.map(suggestion => (
            <li key={suggestion.name}><ExternalLink href={suggestion.url}>{suggestion.name}</ExternalLink></li>
          ))}
        </ul>
      </div>
      <div className="sidebar-links-homeaway">
        <h3>HomeAway Listings</h3>
        <ul>
          {listings.map(listing => (
            <li key={listing.name}><ExternalLink href={listing.url}>{listing.name}</ExternalLink></li>
          ))}
        </ul>
      </div>
    </div>
  );
});
