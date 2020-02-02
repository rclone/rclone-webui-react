import { GET_VERSION, REQUEST_ERROR, REQUEST_SUCCESS } from "../actions/types";

const initialState = {
  version: {}
};

export default (state = initialState, action) => {
  if (action.type === GET_VERSION) {
    if (action.status === REQUEST_SUCCESS) {
      return {
        ...state,
        version: action.payload,
        hasError: false
      };
    }
    if (action.status === REQUEST_ERROR) {
      return {
        ...state,
        error: action.payload,
        hasError: true
      };
    }
  }

  return state;
};
