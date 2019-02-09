import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { AgmCoreModule } from '@agm/core';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyD2HsJrbaxx_-0uOOq-mPU5ZQCoCio07Yo'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
