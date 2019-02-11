import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  @Input() center: any;
  @Input() currentPlace: any;
  @Input() places: any;
  @Input() colors: any;
  @Output() setCurrentPlace = new EventEmitter<any>();
  @Output() addPlace = new EventEmitter<any>();
  @Output() removePlace = new EventEmitter<any>();

  constructor() {
  }

  // user clicked on map - tell parent to set currentPlace
  _clickMap(coords) {
    let place = {
      //. get place name via geocoding
      name: '(place set via map click)',
      lat: coords.lat,
      lng: coords.lng,
      isNew: true,
    };
    this.setCurrentPlace.emit(place);
  }
  
  // user clicked on the Add Place link in the infobox
  _clickAddPlace(place, infoWindow) {
    this.addPlace.emit(place);
    infoWindow.close();
  }

  // user clicked on the Remove Place link in the infobox
  _clickRemovePlace(i, infoWindow) {
    this.removePlace.emit(i);
    infoWindow.close();
  }

  ngOnInit() {
  }

}
