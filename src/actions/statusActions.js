import axiosInstance from "../utils/API";
import {FETCH_STATUS_FAILED, FETCH_STATUS_SUCCESS} from "./types";


export const getStatus = () => dispatch => {
    console.log("get Status");
    axiosInstance.post('/core/stats').then(res => dispatch({
        type: FETCH_STATUS_SUCCESS,
        payload: res.data
    }), error => dispatch({
        type: FETCH_STATUS_FAILED,
        payload: error
    }))
};

