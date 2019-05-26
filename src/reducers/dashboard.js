import { DASHBOARD_LOADED, DASHBOARD_UNLOADED } from "../constants/actionTypes";

export default (state = {}, action) => {
  switch (action.type) {
    case DASHBOARD_LOADED:
      return { ...state, ...action.payload };
    case DASHBOARD_UNLOADED:
      return {};
    default:
      return state;
  }
};
