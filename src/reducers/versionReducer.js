import { GET_VERSION, REQUEST_ERROR, REQUEST_SUCCESS } from '../actions/types';

export const initialState = {
  arch: '',
  decomposed: [],
  goVersion: '',
  isGit: false,
  os: '',
  version: '',
  hasError: false
};

export default (state = initialState, action) => {
  if (action.type === GET_VERSION) {
    if (action.status === REQUEST_SUCCESS) {
      return {
        ...state,
        ...action.payload,
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
