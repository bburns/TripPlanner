import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-itinerary',
  templateUrl: './itinerary.component.html',
  styleUrls: ['./itinerary.component.scss']
})
export class ItineraryComponent implements OnInit {

  @Input() places: any;

  constructor() {
  }

  ngOnInit() {
  }

}
