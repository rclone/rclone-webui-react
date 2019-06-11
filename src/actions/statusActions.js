import axiosInstance from "../utils/API";
import {FETCH_STATUS, REQUEST_ERROR, REQUEST_SUCCESS} from "./types";


export const getStatus = () => dispatch => {
    console.log("get Status");
    axiosInstance.post('/core/stats').then(res => dispatch({
        type: FETCH_STATUS,
        status: REQUEST_SUCCESS,
        payload: res.data
    }), error => dispatch({
        type: FETCH_STATUS,
        status: REQUEST_ERROR,
        payload: error
    }))
};

