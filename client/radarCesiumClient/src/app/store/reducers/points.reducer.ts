import {RadarEntity} from "../../radarPoint";
import * as RadarPointAction from "../actions/points.action";

export type Actions = RadarPointAction.ALL;

const InitState: RadarEntity[] = [];

export function RadarReducer(state: RadarEntity[] = InitState, action: Actions) {
// export function RadarReducer(state = InitState, action: Action) {
  console.log(state, action);

  switch (action.type) {

    case RadarPointAction.POINTS_LOADED:
      console.log(action.payload);
      return {...state};

    case RadarPointAction.POINT_ADDED:
      return action.payload;

    case RadarPointAction.POINT_UPDATED:
      return [...state, action.payload];
      // return {...state};

    default:
      return state;
  }
}



