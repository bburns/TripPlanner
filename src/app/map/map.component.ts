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
  // @Output() addPlace = new EventEmitter<any>();
  // @Output() removePlace = new EventEmitter<any>();

  constructor() {
  }

  // user clicked on map - tell parent to set currentPlace
  _clickMap(lat: number, lng: number) {
    alert("click map - set current place");
    this.setCurrentPlace.emit({ lat, lng });
  }
  
  // // might not need this
  // handleClickMarker(event) {
  //   alert("click marker");
  //   // this.selectedMarker = {
  //   //   lat: event.latitude,
  //   //   lng: event.longitude
  //   // };
  // }
  
  // handleClickCurrentPlace(event) {
  //   alert("click current marker");
  //   // this.selectedMarker = {
  //   //   lat: event.latitude,
  //   //   lng: event.longitude
  //   // };
  // }
  
  // // user clicked on the Add place link in the infobox
  // handleClickAdd(placeId) {
  //   alert('add place ' + placeId);
  //   this.addPlace.emit(placeId);
  // }

  // // user clicked on the Remove place link in the infobox
  // handleClickRemove(placeId) {
  //   alert('remove place ' + placeId);
  //   this.removePlace.emit(placeId);
  // }

  ngOnInit() {
  }

}
