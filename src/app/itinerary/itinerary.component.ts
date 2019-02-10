import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-itinerary',
  templateUrl: './itinerary.component.html',
  styleUrls: ['./itinerary.component.scss']
})
export class ItineraryComponent implements OnInit {

  @Input() places: Array<any>;
  @Output() removePlace = new EventEmitter<any>();

  constructor() {
  }

  _clickRemove(placeIndex) {
    let place = this.places[placeIndex];
    if (confirm(`Remove ${place.name} from itinerary?`)) {
      this.removePlace.emit(placeIndex);
    }
  }

  onClickAdd() {
    alert("add");
  }

  ngOnInit() {
  }

}
