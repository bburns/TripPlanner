import { Component } from '@angular/core';
// import { Input, EventEmitter } from '@angular/core';
import { ViewChild, ElementRef, NgZone, } from '@angular/core';
import { MapsAPILoader } from '@agm/core';
import { GooglePlaceDirective } from 'ngx-google-places-autocomplete/ngx-google-places-autocomplete.directive';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title: string = 'TripPlanner';
  @ViewChild('places') places: GooglePlaceDirective;
  @ViewChild('search') public searchElement: ElementRef;

  // @Input() setCurrentPlace: EventEmitter<any>;

  // default to austin tx
  center: { lat: number, lng: number } = {
    lat: 30.267153,
    lng: -97.7430608,
  }

  currentPlace: any;

  // // spacex launch complex 40, cape canaveral FL
  // currentPlace: any = {
  //   lat: 28.562106,
  //   lng: -80.57718,
  // };

  // list of colors for lines between places
  colors: Array<string> = ['red', 'orange', 'yellow', 'green', 'blue', 'violet'];

  // list of places in itinerary
  itinerary: Array<object> = [
    { name: 'Austin, TX', lat: 30.267153, lng: -97.7430608 },
    { name: 'New York, NY', lat: 40.7127, lng: -74.0059 },
    { name: 'SpaceX Launch Complex 40, Cape Canaveral, FL', lat: 28.562106, lng: -80.57718 },
  ];

  constructor(private mapsAPILoader: MapsAPILoader, private ngZone: NgZone) {
    //. make a nicer confirm dialog somehow
    // if (navigator) {
    //   navigator.geolocation.getCurrentPosition(pos => {
    //     this.center = {
    //       lat: +pos.coords.latitude,
    //       lng: +pos.coords.longitude,
    //     }
    //   });
    // }
  }

  // public handleAddressChange(address: Address) {
  public handleAddressChange(address) {
    console.log(address.geometry.location.lng());
    console.log(address.geometry.location.lat());
    console.log(address.geometry.location.toJSON());
    console.log(address.geometry.viewport.getNorthEast());
    this.center.lat = address.geometry.location.lat();
    this.center.lng = address.geometry.location.lng();
  }

  public handleSetCurrentPlace(coords) {
    // alert('click set current place ' + JSON.stringify(coords));
    this.currentPlace = coords;
  }

  public handleAddPlace(place) {
    // alert('add place ' + JSON.stringify(place));
    this.itinerary.push(place);
  }

  public handleRemovePlace(i) {
    // alert('remove place ' + JSON.stringify(i));
    this.itinerary.splice(i, 1);
  }

}
