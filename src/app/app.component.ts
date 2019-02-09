import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title: string = 'TripPlanner';
  // lat: number = 30.267153;
  // lng: number = -97.7430608; 
  places = [
    {name: 'Austin, TX', lat: 30.267153, lng: -97.7430608},
    {name: 'New York, NY', lat: 40.7127, lng: -74.0059},
  ];
}
