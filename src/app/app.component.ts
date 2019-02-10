import { Component } from '@angular/core';
// import { MapsAPILoader } from '@agm/core';
// import { ViewChild, ElementRef, NgZone } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title: string = 'TripPlanner';

  // default to austin tx
  center: { lat: number, lng: number } = {
    lat: 30.267153,
    lng: -97.7430608,
  }

  // list of places in itinerary
  itinerary: Array<object> = [
    { name: 'Austin, TX', lat: 30.267153, lng: -97.7430608 },
    { name: 'New York, NY', lat: 40.7127, lng: -74.0059 },
    { name: 'SpaceX Launch Complex 40, Cape Canaveral, FL', lat: 28.562106, lng: -80.57718 },
  ];

  currentPlace: any;

  // list of colors for lines between places
  colors: Array<string> = ['red', 'orange', 'yellow', 'green', 'blue', 'violet'];

  // constructor(private mapsAPILoader: MapsAPILoader, private ngZone: NgZone) {
  //   //. make a nicer confirm dialog somehow
  //   // if (navigator) {
  //   //   navigator.geolocation.getCurrentPosition(pos => {
  //   //     this.center = {
  //   //       lat: +pos.coords.latitude,
  //   //       lng: +pos.coords.longitude,
  //   //     }
  //   //   });
  //   // }
  // }

  public handleSetCurrentPlace(place) {
    this.currentPlace = place;
  }

  public handleAddPlace(place) {
    this.itinerary.push(place);
  }

  public handleRemovePlace(i) {
    this.itinerary.splice(i, 1);
  }

}
