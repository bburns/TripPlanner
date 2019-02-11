import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';


@Component({
  selector: 'app-itinerary',
  templateUrl: './itinerary.component.html',
  styleUrls: ['./itinerary.component.scss']
})

export class ItineraryComponent {

  @Input() places: Array<any>;
  @Output() removePlace = new EventEmitter<any>();

  _clickRemove(placeIndex) {
    let place = this.places[placeIndex];
    if (confirm(`Remove ${place.name} from itinerary?`)) {
      this.removePlace.emit(placeIndex);
    }
  }

  _dropItem(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.places, event.previousIndex, event.currentIndex);  
  }

}
