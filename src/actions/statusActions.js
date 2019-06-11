import axiosInstance from "../utils/API";
import {FETCH_STATUS} from "./types";

export const getStatus = () => dispatch => {
    console.log("get Status");
    axiosInstance.post('/core/stats').then(res => dispatch({
        type: FETCH_STATUS,
        payload: res.data
    }))
};

