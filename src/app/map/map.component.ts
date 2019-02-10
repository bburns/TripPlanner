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

  constructor() {
  }

  onClickMap(lat: number, lng: number) {
    // this.places.push({ lat, lng, alpha: 0.4 });
    alert("click map");
  }
  
  onClickAdd(placeId) {
    alert('add place ' + placeId);
  }

  ngOnInit() {
  }

}
