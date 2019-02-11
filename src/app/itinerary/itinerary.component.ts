import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

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

  _dropItem(event: CdkDragDrop<string[]>) {
    // alert("dropped " + JSON.stringify(event.previousIndex));
    // moveItemInArray(this.artists, event.previousIndex, event.currentIndex);  
  }

  onClickAdd() {
    alert("add");
  }

  ngOnInit() {
  }

}
