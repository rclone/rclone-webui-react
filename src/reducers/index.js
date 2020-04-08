import {combineReducers} from 'redux';

import statusReducer from './statusReducer';
import configReducer from "./configReducer";
import explorerReducer from "./explorerReducer";
import explorerState from "./explorerStateReducer";
import {SIGNOUT_REQUEST} from "../actions/types";
import providerStatusReducer from "./providerStatusReducer";
import userActionsReducer from "./userActionsReducer";
import imagesReducer from "./imagesReducer";
import versionReducer from "./versionReducer";

/**
 * Configures the root reducer to be executed before any other reducers configured in the system.
 * This involves actions for clearing the localStorage and state when user signs out.
 * @param state
 * @param action
 * @returns {any}
 */
const rootReducer = (state, action) => {
    if (action.type === SIGNOUT_REQUEST) {
        localStorage.clear();
        state = undefined;
    }

    return appReducer(state, action);
};

/**
 * List of reducers to be configured. The reducers are called one by one from top to bottom.
 * @type {Reducer<any>}
 */
const appReducer = combineReducers({
    status: statusReducer,
    config: configReducer,
    remote: explorerReducer,
    explorer: explorerState,
    providerStatus: providerStatusReducer,
    user: userActionsReducer,
    imageLoader: imagesReducer,
    version: versionReducer
    // remoteOps: remoteOpsReducer
});

export default rootReducer;