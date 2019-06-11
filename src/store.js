import {applyMiddleware, compose, createStore} from "redux";
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const initalState = {};

const middleware = [thunk];

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer,
    initalState,
    composeEnhancers(
        applyMiddleware(...middleware)
    ));

export default store;