import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { useNeomem } from '../application';
import { useGlobals } from '../application';
import Markdown from '../../packages/markdown';
import ExternalLink from '../../packages/external-link';
import './styles.css';

//. need google maps and map objects -
//  map component should set ui.maps, ui.map, which this will see

export default observer(() => {

  const [ details, setDetails ] = useState(null);
  const neomem = useNeomem();
  const globals = useGlobals();
  const currentNodeId = neomem.currentNodeId; //. mobx problem?
  const place = neomem.getNode(currentNodeId);
  
  //. fetch stuff async here - ie when place changes, ie currentnodeid
  useEffect(() => {
    function getDetailsCallback(results, status) {
      // setDetails({});
      // if (status == app.maps.places.PlacesServiceStatus.OK) {
      if (status == globals.maps.places.PlacesServiceStatus.OK) {
        // add id's to reviews for react rendering
        if (results.reviews) {
          results.reviews.forEach(review => review.id = Math.random());
        }
        // fetch first photo - others on clicking carousel
        const photos = results.photos;
        // console.log(photos);
        if (photos && photos.length > 0) {
          const size = {'maxWidth': 200, 'maxHeight': 150};
          const url = photos[0].getUrl(size);
          photos[0].url = url;
          results.photos = [photos[0]];
        }
        setDetails(results);
      } else {
        alert('error');
      }
    }
    // need ui.maps, ui.map to be ready - wait for them
    // if (place && place.placeId && app.maps && app.map) {
    if (place && place.placeId && globals.maps && globals.map) {
      // const service = new app.maps.places.PlacesService(app.map);
      const service = new globals.maps.places.PlacesService(globals.map);
      const request = {
        placeId: place.placeId,
        fields: ['name', 'photo', 'url', 'rating', 'review'],
      };
      service.getDetails(request, getDetailsCallback);
    } else {
      setDetails({});
    }
  }, [place && place.id]);
  //. also want to cache it in neomem, but don't persist place details to db (or could for 24hrs?)
  // console.log(details && details.photos);

  if (!place) return null;
  
  return (
    <div className="sidebar-details">
      {details &&
        <>
          {details.photos &&
            <div className="sidebar-details-photos">
              <div className="sidebar-details-photo">
                <img src={details.photos[0].url} alt=""/>
              </div>
            </div>
          }
          <div className="sidebar-details-url">
            {/* <a href={details.url}>Google Map page</a> */}
            Go to <ExternalLink href={details.url}>Google Maps page</ExternalLink>
          </div>
          {details.rating &&
            <div className="sidebar-details-rating">
              Average rating: {details.rating}
            </div>
          }
          {details.reviews && 
            <div className="sidebar-details-reviews">
              <div className="sidebar-details-reviews-title">Reviews</div>
              {details.reviews.map(review => (
                <div className="sidebar-details-review" key={review.id}>
                  <hr />
                  <div>Rating: {review.rating} ({review.relative_time_description})</div>
                  {/* <div>{review.text.slice(0,160)}</div> */}
                  <Markdown source={review.text} />
                </div>
              ))}
            </div>
          }
        </>
      }
    </div>
  );
});
