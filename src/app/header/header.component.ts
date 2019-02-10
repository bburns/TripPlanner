import { Component, OnInit, Input } from '@angular/core';
import { ViewChild, ElementRef, NgZone, } from '@angular/core';
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

  constructor() {
  }

  _enterAddress(address) {
    alert("place entered " + JSON.stringify(address));
    console.log(address.geometry.location.lng());
    console.log(address.geometry.location.lat());
    console.log(address.geometry.location.toJSON());
    console.log(address.geometry.viewport.getNorthEast());
    // this.center.lat = address.geometry.location.lat();
    // this.center.lng = address.geometry.location.lng();
  }
  
  ngOnInit() {
  }

}
