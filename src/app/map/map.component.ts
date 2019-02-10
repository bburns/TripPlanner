import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  @Input() center: any;
  @Input() places: any;
  @Input() colors: any;

  // selectedMarker: any;

  constructor() {
  }

  onClickMap(lat: number, lng: number) {
    alert("click map");
    // this.places.push({ lat, lng, alpha: 0.4 });
  }
  
  onClickMarker(event) {
    alert("click marker");
    // this.selectedMarker = {
    //   lat: event.latitude,
    //   lng: event.longitude
    // };
  }
  
  onClickAdd(placeId) {
    alert('add place ' + placeId);
  }

  ngOnInit() {
  }

}
