import {combineReducers} from 'redux';

import statusReducer from './statusReducer';
import configReducer from "./configReducer";
import explorerReducer from "./explorerReducer";
import explorerState from "./explorerStateReducer";

export default combineReducers({
    status: statusReducer,
    config: configReducer,
    remote: explorerReducer,
    explorer: explorerState
})