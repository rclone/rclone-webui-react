import axiosInstance from "../utils/API/API";
import {ENABLE_STATUS_CHECK, FETCH_STATUS, GET_BANDWIDTH, REQUEST_ERROR, REQUEST_SUCCESS, SET_BANDWIDTH} from "./types";
import urls from "../utils/API/endpoint";

/**
 * Gets the current status of the rclone backend.
 * Depends upon state.status.checkStatus to execute the http request, if set to false, does not send any http request
 * @returns {Function}
 */
export const getStatus = () => async (dispatch, getState) => {
    // console.log("get Status");
    const {status} = getState();
    if (status.checkStatus) {
        axiosInstance.post(urls.stats).then(res => dispatch({
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

/**
 * Enables or disables the check status functionality to improve network performance.
 * Modifies state.status.checkStatus according to the passed value.
 * @param shouldEnable {boolean} It specifies whether to check for status updates from the backend or skip checking it
 * @returns {Function}
 */
export const enableCheckStatus = (shouldEnable) => async dispatch => {
    dispatch({
        type: ENABLE_STATUS_CHECK,
        payload: shouldEnable
    })
};


/**
 * Gets the current bandwidth set in the rclone backend.
 * @returns {Function}
 */
export const getBandwidth = () => async dispatch => {
    // console.log("get Status");
    axiosInstance.post(urls.bwlimit).then(res => dispatch({
        type: GET_BANDWIDTH,
        status: REQUEST_SUCCESS,
        payload: res.data
    }), error => dispatch({
        type: GET_BANDWIDTH,
        status: REQUEST_ERROR,
        payload: error
    }))
};

/**
 * Changes the current bandwidth limit of the rclone backend.
 * @param newRate {string} Human readable format of size eg: 1M|2M|1.2G specifying 1MB, 2MB, 1.2GB respectively.
 * @returns {Function}
 */
export const setBandwidth = (newRate) => async dispatch => {
    // console.log("get Status");
    axiosInstance.post(urls.bwlimit, {rate: newRate}).then(res => dispatch({
        type: SET_BANDWIDTH,
        status: REQUEST_SUCCESS,
        payload: res.data
    }), error => dispatch({
        type: SET_BANDWIDTH,
        status: REQUEST_ERROR,
        payload: error
    }))
};

