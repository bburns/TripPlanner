import { Component } from '@angular/core';
// import { NgZone } from '@angular/core';
// import { MapsAPILoader } from '@agm/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {

  title: string = 'TripPlanner';

  // center of map
  center: any = { lat: 30.267153, lng: -97.7430608 }; // austin tx

  // current marker on map
  currentPlace: any;

  // list of places in itinerary
  places: Array<object> = [
    { name: 'Austin, TX', lat: 30.267153, lng: -97.7430608 },
    { name: 'New York, NY', lat: 40.7127, lng: -74.0059 },
    { name: 'SpaceX Launch Complex 40, Cape Canaveral, FL', lat: 28.562106, lng: -80.57718 },
  ];

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

  public handleSetCurrentPlace(place: any) {
    this.currentPlace = place;
  }

  public handleAddPlace(place: any) {
    this.places.push(place);
  }

  public handleRemovePlace(i: number) {
    this.places.splice(i, 1);
  }

}
