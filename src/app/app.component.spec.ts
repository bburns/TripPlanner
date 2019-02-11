import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { AboutComponent } from './about/about.component';
import { HeaderComponent } from './header/header.component';
import { MapComponent } from './map/map.component';
import { ItineraryComponent } from './itinerary/itinerary.component';
import { FooterComponent } from './footer/footer.component';

import { AgmCoreModule } from '@agm/core';


describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        AboutComponent,
        HeaderComponent,
        MapComponent,
        ItineraryComponent,
        FooterComponent,
      ],
      imports: [
        AgmCoreModule.forRoot({
          apiKey: 'AIzaSyB0qUaK55LTdIG4WHJYjWHjLJJZsnIl9rY', // google maps api key - also set in index.html
          libraries: ['places'], // needed for autocomplete
        }),    
      ]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'TripPlanner'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('TripPlanner');
  });

  // it('should render title in a h1 tag', () => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   fixture.detectChanges();
  //   const compiled = fixture.debugElement.nativeElement;
  //   expect(compiled.querySelector('h1').textContent).toContain('Welcome to arttour-angular!');
  // });
});
