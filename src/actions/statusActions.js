import axiosInstance from "../utils/API/API";

import {FETCH_STATUS, REQUEST_ERROR, REQUEST_SUCCESS} from "./types";


export const getStatus = () => async dispatch => {
    // console.log("get Status");
    axiosInstance.post('/core/stats').then(res => dispatch({
        type: FETCH_STATUS,
        status: REQUEST_SUCCESS,
        payload: res.data,
        meta: {
            throttle: 5000
        }
    }), error => dispatch({
        type: FETCH_STATUS,
        status: REQUEST_ERROR,
        payload: error
    }))
};

