import {combineReducers} from 'redux';

import statusReducer from './statusReducer';
import configReducer from "./configReducer";
import explorerReducer from "./explorerReducer";
import explorerState from "./explorerStateReducer";
import {SIGNOUT_REQUEST} from "../actions/types";
import providerStatusReducer from "./providerStatusReducer";

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

const appReducer = combineReducers({
    status: statusReducer,
    config: configReducer,
    remote: explorerReducer,
    explorer: explorerState,
    providerStatus: providerStatusReducer,
    // remoteOps: remoteOpsReducer
});

export default rootReducer;