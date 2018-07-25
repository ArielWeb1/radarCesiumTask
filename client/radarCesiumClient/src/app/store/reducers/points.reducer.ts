import {RadarEntity} from "../../radarPoint";
import * as RadarPointAction from "../actions/points.action";

export type Action = RadarPointAction.ALL;

export interface RadarState {
  status: string;
}

const InitState: RadarState = {
  status: 'none'
};

export function RadarReducer(state = InitState, action: Action) {
  console.log(state, action);

  switch (action.type) {

    case RadarPointAction.POINTS_LOADED:
      return {...state};

    case RadarPointAction.POINT_ADDED:
      return {...state};

    case RadarPointAction.POINT_UPDATED:
      return {...state};

    default:
      return state;
  }
}



