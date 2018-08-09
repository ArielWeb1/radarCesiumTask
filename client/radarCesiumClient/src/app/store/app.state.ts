import {RadarEntity} from "../radarPoint";
import {PolylinePoint} from "../polylinePoint";

export interface AppState {
  readonly radar: RadarEntity[];
}
//
export interface AppStatePlolyoine {
  readonly newRadar: PolylinePoint[];
}
