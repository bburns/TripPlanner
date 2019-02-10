import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AboutComponent } from './about/about.component';
import { HeaderComponent } from './header/header.component';
import { MapComponent } from './map/map.component';
import { ItineraryComponent } from './itinerary/itinerary.component';
import { FooterComponent } from './footer/footer.component';

import { AgmCoreModule } from '@agm/core';
import { GooglePlaceModule } from "ngx-google-places-autocomplete";

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    HeaderComponent,
    MapComponent,
    ItineraryComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyB0qUaK55LTdIG4WHJYjWHjLJJZsnIl9rY', // google maps api key - also set in index.html
      libraries: ['places'], // needed for autocomplete
    }),
    GooglePlaceModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
