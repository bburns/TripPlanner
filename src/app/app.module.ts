import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AboutComponent } from './about/about.component';
import { HeaderComponent } from './header/header.component';
import { MapComponent } from './map/map.component';
import { HomeComponent } from './home/home.component';
import { ItineraryComponent } from './itinerary/itinerary.component';
import { FooterComponent } from './footer/footer.component';

import { AgmCoreModule } from '@agm/core';


@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    HeaderComponent,
    MapComponent,
    HomeComponent,
    ItineraryComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyD2HsJrbaxx_-0uOOq-mPU5ZQCoCio07Yo', // my google maps api key
      libraries: ['places'],
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
