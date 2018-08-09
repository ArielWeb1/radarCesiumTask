import {Action} from '@ngrx/store';
import {PolylinePoint} from "../../polylinePoint";

export const POLYLINEPOINTS_LOADED = '[NewPoints] Loaded';

export const POLYLINEPOINT_ADDED = '[NewPoints] Added';

export const POLYLINEPOINT_UPDATED = '[NewPoints] Updated';

export class PolylinePointsLoaded implements Action {
  public type: string;
  public payload: any;

  constructor() {
    this.type = POLYLINEPOINTS_LOADED;
    this.payload = null;
  }
}
export class PolylinePointsAdded implements Action {
  public type: string;
  public payload: PolylinePoint[];

  constructor(payload: PolylinePoint[]) {
    this.type = POLYLINEPOINT_ADDED;
    this.payload = payload;
  };
}
export class PolylinePointsUpdated implements Action {
  public type: string;
  public payload: PolylinePoint;

  constructor(payload: PolylinePoint) {
    this.type = POLYLINEPOINT_UPDATED;
    this.payload = payload;
  };
}

export type ALL = PolylinePointsLoaded | PolylinePointsAdded | PolylinePointsUpdated ;

