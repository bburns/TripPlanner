import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-itenerary',
  templateUrl: './itenerary.component.html',
  styleUrls: ['./itenerary.component.scss']
})
export class IteneraryComponent implements OnInit {

  private places: any;

  constructor() {
    this.places = [
      {name: 'Austin, TX', lat: 30.267153, lng: -97.7430608},
    ];
  }

  ngOnInit() {
  }

}
