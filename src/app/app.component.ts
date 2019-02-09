import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title: string = 'TripPlanner';
  lat: number = 30.267153;
  lng: number = -97.7430608;
}
