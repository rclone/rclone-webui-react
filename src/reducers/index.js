import {combineReducers} from 'redux';

import statusReducer from './statusReducer';
import configReducer from "./configReducer";

export default combineReducers({
    status: statusReducer,
    config: configReducer
})