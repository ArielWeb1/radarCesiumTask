import { Injectable } from '@angular/core';
import {Viewer} from 'cesium';

@Injectable({
  providedIn: 'root'
})
export class CesiumViewerService {
  _viewer: Viewer;

  get viewer() {
    return this._viewer;
  }

  set viewer(viewer: Viewer) {
    this._viewer = viewer;
  }
}
