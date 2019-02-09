import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  // @Input() lat: string;
  // @Input() lng: string;
  @Input() places: any;
  @Input() colors: any;

  constructor() { }

  ngOnInit() {
  }

}
