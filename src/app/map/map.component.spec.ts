import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapComponent } from './map.component';
import { AgmCoreModule } from '@agm/core';
// import { AgmMap, AgmMarker, AgmInfoWindow, AgmPolyline, AgmPolylinePoint } from '@agm/core';


describe('MapComponent', () => {
  let component: MapComponent;
  let fixture: ComponentFixture<MapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        MapComponent,
      ],
      imports: [
        AgmCoreModule.forRoot({
          apiKey: 'AIzaSyB0qUaK55LTdIG4WHJYjWHjLJJZsnIl9rY', // google maps api key - also set in index.html
          libraries: ['places'], // needed for autocomplete
        }),
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
