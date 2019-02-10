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
  _clickMap(lat: number, lng: number) {
    alert(`click map - set current place ${lat} ${lng}`);
    this.setCurrentPlace.emit({ lat, lng });
  }
  
  // user clicked on the Add Place link in the infobox
  _clickAddPlace(coords) {
    alert('add place ' + JSON.stringify(coords));
    let place = {
      name: '(uhhhh)',
      lat: coords.lat,
      lng: coords.lng,
    };
    this.addPlace.emit(place);
  }

  // user clicked on the Remove Place link in the infobox
  _clickRemovePlace(i) {
    alert('remove place ' + JSON.stringify(i));
    this.removePlace.emit(i);
  }

  ngOnInit() {
  }

}
