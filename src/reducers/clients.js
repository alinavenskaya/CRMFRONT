import { CLIENTS_LOADED, CLIENTS_UNLOADED } from "../constants/actionTypes";

const initialState = {
  rows: []
};
export default (state = initialState, action) => {
  switch (action.type) {
    case CLIENTS_LOADED:
      return { ...state, rows: action.payload };
    case CLIENTS_UNLOADED:
      return initialState;
    default:
      return state;
  }
};
