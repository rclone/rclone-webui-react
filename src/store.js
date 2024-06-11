import {applyMiddleware, compose, createStore} from "redux";
import {
    configureStore,
    Tuple
} from "@reduxjs/toolkit";
//import thunk from 'redux-thunk';
import rootReducer from './reducers';
import {StateLoader} from "./utils/StateLoader";
import throttledMiddleware from './throttled';


export const middleware = [throttledMiddleware];

//const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const stateLoader = new StateLoader();

const store = configureStore({
    reducer: rootReducer,
    middleware: () => new Tuple(...middleware),
    //composeEnhancers: composeEnhancers,
    devTools: process.env.NODE_ENV !== 'production',
    preloadedState: stateLoader.loadState()
})

//Function to persist store data to localStorage
store.subscribe(() => {
    stateLoader.saveState(store.getState());
});

export default store;