import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title: string = 'TripPlanner';

  // default to austin tx
  center = {
    lat: 30.267153,
    lng: -97.7430608,  
  }

  // list of colors for lines between places
  colors = ['red', 'orange', 'yellow', 'green', 'blue', 'violet'];

  // list of places in itinerary
  places = [
    { name: 'Austin, TX', lat: 30.267153, lng: -97.7430608 },
    { name: 'New York, NY', lat: 40.7127, lng: -74.0059 },
  ];

  constructor() {
    if (navigator) {
      navigator.geolocation.getCurrentPosition(pos => {
        this.center = {
          lat: +pos.coords.latitude,
          lng: +pos.coords.longitude,
        }
      });
    }
  }

  onRemovePlace(placeIndex) {
    this.places.splice(placeIndex, 1);
  }
}
