import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-itinerary',
  templateUrl: './itinerary.component.html',
  styleUrls: ['./itinerary.component.scss']
})
export class ItineraryComponent implements OnInit {

  @Input() places: any;
  @Output() removePlace = new EventEmitter<any>();

  constructor() {
  }

  onClickMe(placeIndex) {
    let place = this.places[placeIndex];
    if (confirm(`Remove ${place.name} from itinerary?`)) {
      this.removePlace.emit(placeIndex);
    }
  }

  ngOnInit() {
  }

}
