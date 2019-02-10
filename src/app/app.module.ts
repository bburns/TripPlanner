import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AboutComponent } from './about/about.component';
import { HeaderComponent } from './header/header.component';
import { MapComponent } from './map/map.component';
import { ItineraryComponent } from './itinerary/itinerary.component';
import { FooterComponent } from './footer/footer.component';

import { AgmCoreModule } from '@agm/core';


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
      apiKey: 'AIzaSyB0qUaK55LTdIG4WHJYjWHjLJJZsnIl9rY', // my google maps api key
      libraries: ['places'],
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
