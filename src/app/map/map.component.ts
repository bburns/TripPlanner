import { Component, OnInit, Input } from '@angular/core';

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

  // selectedMarker: any;

  constructor() {
  }

  onClickMap(lat: number, lng: number) {
    alert("click map");
    // this.places.push({ lat, lng, alpha: 0.4 });
  }
  
  // might not need this
  onClickMarker(event) {
    alert("click marker");
    // this.selectedMarker = {
    //   lat: event.latitude,
    //   lng: event.longitude
    // };
  }
  
  // user clicked on the Add place link in the infobox
  onClickAdd(placeId) {
    alert('add place ' + placeId);
  }

  ngOnInit() {
  }

}
