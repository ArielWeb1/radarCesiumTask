import {Action} from '@ngrx/store';
import {RadarEntity} from "../../radarPoint";

export const POINTS_LOADED = '[Points] Loaded';

export const POINT_ADDED = '[Points] Added';

export const POINT_UPDATED = '[Points] Updated';

export class PointsLoaded implements Action {
  public type: string;
  public payload: any;

  constructor() {
    this.type = POINTS_LOADED;
    this.payload = null;
  }
}
export class PointsAdded implements Action {
  public type: string;
  public payload: RadarEntity[];

  constructor(payload: RadarEntity[]) {
    this.type = POINT_ADDED;
    this.payload = payload;
  };
}
export class PointsUpdated implements Action {
  public type: string;
  public payload: RadarEntity;

  constructor(payload: RadarEntity) {
    this.type = POINT_UPDATED;
    this.payload = payload;
  };
}

// export class PointsLoaded implements Action {
//   readonly type = POINTS_LOADED;
//
//   constructor(public payload: RadarPoint) {
//     this.payload = payload;
//   };
// }
//
// export class PointsAdded implements Action {
//   readonly type = POINT_ADDED;
//
//   constructor(public payload: RadarPoint) {
//     this.payload = payload;
//   };
// }
//
// export class PointsUpdated implements Action {
//   readonly type = POINT_UPDATED;
//
//   constructor(public payload: RadarPoint) {
//     this.payload = payload;
//   };
// }

export type ALL = PointsLoaded | PointsAdded | PointsUpdated ;

