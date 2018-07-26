import { Directive, ElementRef, OnInit } from '@angular/core';
import {CesiumViewerService} from "./services/cesium-viewer.service";

@Directive({
  selector: '[appCesium]'
})
export class CesiumDirective implements OnInit {

  constructor(private el: ElementRef, private viewerService: CesiumViewerService) {
  }
  ngOnInit() {
    this.viewerService.viewer = new Cesium.Viewer(this.el.nativeElement);
    // const viewer = new Cesium.Viewer(this.el.nativeElement);

    // this.store.select('RadarReducer').subscribe((data: AppState) => this.state = data )

    // viewer.entities.add({
    //   position : Cesium.Cartesian3.fromDegrees(-75.59777, 40.03883),
    //   billboard : billboard
    // });
  }
}


