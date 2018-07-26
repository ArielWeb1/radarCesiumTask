import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CesiumDirective } from './cesium.directive';

import { StoreModule } from '@ngrx/store';
import {EffectsModule} from "@ngrx/effects";
import {RadarReducer} from "./store/reducers/points.reducer";
import {AuthEffect} from "./store/effects/points.effect";

@NgModule({
  declarations: [
    AppComponent,
    CesiumDirective
  ],
  imports: [
    BrowserModule,
    StoreModule.forRoot({
      radar: RadarReducer
    }),
    EffectsModule.forRoot([AuthEffect])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
