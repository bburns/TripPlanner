import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Place, LatLng } from 'types';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})

export class MapComponent {

  @Input() center: LatLng;
  @Input() currentPlace: Place;
  @Input() places: Array<Place>;
  @Input() colors: Array<string>;
  @Output() setCurrentPlace = new EventEmitter<any>();
  @Output() addPlace = new EventEmitter<any>();
  @Output() removePlace = new EventEmitter<any>();


  // user clicked on map - tell parent to set currentPlace
  handleClickMap(coords: LatLng) {
    let place = {
      //. get place name via geocoding
      name: '(place set via map click)',
      lat: coords.lat,
      lng: coords.lng,
      // isNew: true, //. trying to force infowindow open
    };
    this.setCurrentPlace.emit(place);
  }
  
  // user clicked on the Add Place link in the infobox
  handleClickAddPlace(place: Place, infoWindow) {
    this.addPlace.emit(place);
    infoWindow.close();
  }

  // user clicked on the Remove Place link in the infobox
  handleClickRemovePlace(i: number, infoWindow) {
    this.removePlace.emit(i);
    infoWindow.close();
  }

}
