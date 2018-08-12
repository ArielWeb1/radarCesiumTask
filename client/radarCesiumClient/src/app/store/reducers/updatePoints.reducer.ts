import {PolylinePoint} from "../../polylinePoint";
import * as PlolylinePointAction from  "../actions/updatePoints.action";

export type Actions = PlolylinePointAction.ALL;

const InitState: PolylinePoint[] = [];

export function PolylineReducer(state: PolylinePoint[] = InitState, action: Actions) {

  console.log('action', state, action);

  switch (action.type) {

    case PlolylinePointAction.POLYLINEPOINTS_LOADED:
      console.log(action.payload);
      return {...state};

    case PlolylinePointAction.POLYLINEPOINT_ADDED:
      return action.payload;
      // return state.map(item => {
      //   return item.id == action.payload.id ? Object.assign({}, item, {positions: action.payload.position}): item;
      // });

    case PlolylinePointAction.POLYLINEPOINT_UPDATED:
      return [...state, action.payload];

    default:
      return state;
  }
}
