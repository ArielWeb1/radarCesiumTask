import {Injectable} from "@angular/core";
import {Actions, Effect, ofType} from "@ngrx/effects";
import {map, tap} from 'rxjs/operators';
import {CesiumViewerService} from "../../services/cesium-viewer.service";
import {PolylinePoint} from "../../polylinePoint";
import * as PlolylinePointAction from "../actions/updatePoints.action";
import {POLYLINEPOINT_ADDED} from "../actions/updatePoints.action";

@Injectable()
export class UpdateEffect {

  constructor(private actions$: Actions, private viewerService: CesiumViewerService) {
  }

  @Effect({dispatch: false})
  point$ = this.actions$.pipe(
    ofType<PlolylinePointAction.PolylinePointsAdded>(POLYLINEPOINT_ADDED),
    map(action => action.payload),
    tap((entities: PolylinePoint[]) => {
      entities.forEach(PolylinePoint => {
        const entity: any = {
          polyline: {
            positions: Cesium.Cartesian3.fromDegreesArrayHeights(PolylinePoint.positions),
            width: PolylinePoint.width,
            material: new Cesium.PolylineGlowMaterialProperty({
              glowPower: 0.2,
              color: Cesium.Color.YELLOW
            })
          }
        };
        console.log(entity);
        this.viewerService.viewer.entities.add(entity);
      })
    }))
}
