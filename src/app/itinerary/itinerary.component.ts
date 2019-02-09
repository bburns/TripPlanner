import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-itinerary',
  templateUrl: './itinerary.component.html',
  styleUrls: ['./itinerary.component.scss']
})
export class ItineraryComponent implements OnInit {

  private places: any;

  constructor() {
    this.places = [
      {name: 'Austin, TX', lat: 30.267153, lng: -97.7430608},
      {name: 'New York, NY', lat: 40.7127, lng: -74.0059},
    ];
  }

  ngOnInit() {
  }

}
