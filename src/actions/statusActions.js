import axiosInstance from "../utils/API/API";
import {ENABLE_STATUS_CHECK, FETCH_STATUS, GET_BANDWIDTH, REQUEST_ERROR, REQUEST_SUCCESS, SET_BANDWIDTH} from "./types";


export const getStatus = () => async (dispatch, getState) => {
    // console.log("get Status");
    const {status} = getState();
    if (status.checkStatus) {
        axiosInstance.post('/core/stats').then(res => dispatch({
            type: FETCH_STATUS,
            status: REQUEST_SUCCESS,
            payload: res.data
        }), error => dispatch({
            type: FETCH_STATUS,
            status: REQUEST_ERROR,
            payload: error
        }))
    }
};

export const enableCheckStatus = (shouldEnable) => async dispatch => {
    dispatch({
        type: ENABLE_STATUS_CHECK,
        payload: shouldEnable
    })
};


export const getBandwidth = () => async dispatch => {
    // console.log("get Status");
    axiosInstance.post('core/bwlimit').then(res => dispatch({
        type: GET_BANDWIDTH,
        status: REQUEST_SUCCESS,
        payload: res.data
    }), error => dispatch({
        type: GET_BANDWIDTH,
        status: REQUEST_ERROR,
        payload: error
    }))
};


export const setBandwidth = (newRate) => async dispatch => {
    // console.log("get Status");
    axiosInstance.post('core/bwlimit', {rate: newRate}).then(res => dispatch({
        type: SET_BANDWIDTH,
        status: REQUEST_SUCCESS,
        payload: res.data
    }), error => dispatch({
        type: SET_BANDWIDTH,
        status: REQUEST_ERROR,
        payload: error
    }))
};

