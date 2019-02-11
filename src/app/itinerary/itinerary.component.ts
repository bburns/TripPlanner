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


  handleClickRemove(i: number) {
    let place = this.places[i];
    if (confirm(`Remove ${place.name} from itinerary?`)) {
      this.removePlace.emit(i);
    }
  }

  handleDropItem(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.places, event.previousIndex, event.currentIndex);  
  }

}
