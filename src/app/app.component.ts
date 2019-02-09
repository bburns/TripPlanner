import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title: string = 'arttour-angular';
  lat: number = 51.678418;
  lng: number = 7.809007;
}
