import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ViewChild, ElementRef } from '@angular/core';
import { GooglePlaceDirective } from 'ngx-google-places-autocomplete/ngx-google-places-autocomplete.directive';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input() title: string;
  @ViewChild('places') places: GooglePlaceDirective;
  @ViewChild('search') public searchElement: ElementRef;
  @Output() setCurrentPlace = new EventEmitter<any>();

  constructor() {
  }

  _enterAddress(address) {
    // alert("place entered " + JSON.stringify(address));
    // console.log(address.geometry.location.lng());
    // console.log(address.geometry.location.lat());
    // console.log(address.geometry.location.toJSON());
    // console.log(address.geometry.viewport.getNorthEast());
    // this.center.lat = address.geometry.location.lat();
    // this.center.lng = address.geometry.location.lng();
    let place = {
      name: address.address_components[0].long_name,
      lat: address.geometry.location.lat(),
      lng: address.geometry.location.lng(),
    }
    // alert(JSON.stringify(place));
    this.setCurrentPlace.emit(place);
  }
  
  ngOnInit() {
  }

}
