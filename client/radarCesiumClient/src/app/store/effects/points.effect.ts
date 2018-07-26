import {Injectable} from "@angular/core";
import {Actions, Effect, ofType} from "@ngrx/effects";
import {map, tap} from 'rxjs/operators';
import {CesiumViewerService} from "../../services/cesium-viewer.service";
import {RadarEntity} from "../../radarPoint";
import * as RadarPointAction from "../actions/points.action";
import {POINT_ADDED} from "../actions/points.action";

@Injectable()
export class AuthEffect {

  constructor(private actions$: Actions, private viewerService: CesiumViewerService) {
  }

  @Effect({dispatch: false})
  point$ = this.actions$.pipe(
    ofType<RadarPointAction.PointsAdded>(POINT_ADDED),
    map(action => action.payload),
    tap((entities: RadarEntity[]) => {
      entities.forEach(radarEntity => {
        const entity:any = {
          position: Cesium.Cartesian3.fromDegrees(radarEntity.longitude, radarEntity.latitude),
          billboard: {
            image: radarEntity.billboard.image,
            width: radarEntity.billboard.width,
            height: radarEntity.billboard.height
          }
        };
        this.viewerService.viewer.entities.add(entity);
      })
    }))
}
