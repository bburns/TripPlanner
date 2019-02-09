import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AboutComponent } from './about.component';

import { AgmCoreModule } from '@agm/core';


@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
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
