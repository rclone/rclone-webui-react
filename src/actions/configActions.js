import axiosInstance from "../utils/API/API";
import {GET_CONFIG_DUMP, GET_PROVIDERS, REQUEST_ERROR, REQUEST_SUCCESS} from "./types";

export const getProviders = () => dispatch => {
    axiosInstance.post("/config/providers").then(res => dispatch({
        type: GET_PROVIDERS,
        payload: res.data.providers
    }))
};

export const getConfigDump = () => dispatch => {
    axiosInstance.post("/config/dump").then(res => dispatch({
        type: GET_CONFIG_DUMP,
        status: REQUEST_SUCCESS,
        payload: res.data
    }), error => dispatch({
        type: GET_CONFIG_DUMP,
        status: REQUEST_ERROR,
        payload: error
    }))
};