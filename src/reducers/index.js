import {combineReducers} from 'redux';

import statusReducer from './statusReducer';
import configReducer from "./configReducer";
import explorerReducer from "./explorerReducer";
import explorerState from "./explorerStateReducer";
import {SIGNOUT_REQUEST} from "../actions/types";

const rootReducer = (state, action) => {
    if (action.type === SIGNOUT_REQUEST) {
        localStorage.clear();
        state = undefined;
        console.log("Logout Reducer");
    }

    return appReducer(state, action);
}

const appReducer = combineReducers({
    status: statusReducer,
    config: configReducer,
    remote: explorerReducer,
    explorer: explorerState
});

export default rootReducer;