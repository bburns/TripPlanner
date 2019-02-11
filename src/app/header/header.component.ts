import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ViewChild, ElementRef } from '@angular/core';
import { GooglePlaceDirective } from 'ngx-google-places-autocomplete/ngx-google-places-autocomplete.directive';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent {

  @Input() title: string;
  @Output() addPlace = new EventEmitter<any>();
  @ViewChild('places') places: GooglePlaceDirective;
  @ViewChild('search') public searchElement: ElementRef;

  _enterAddress(address) {
    // alert("place entered " + JSON.stringify(address));
    let place = {
      name: address.address_components[0].long_name,
      lat: address.geometry.location.lat(),
      lng: address.geometry.location.lng(),
    }
    this.addPlace.emit(place);
  }
  
}
