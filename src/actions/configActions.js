import axiosInstance from "../utils/API/API";
import {GET_CONFIG_DUMP, GET_PROVIDERS, REQUEST_ERROR, REQUEST_SUCCESS} from "./types";


/**
 * Gets all Providers from the rclone UI Backend
 * @returns {Function}
 */
export const getProviders = () => dispatch => {
    axiosInstance.post("/config/providers").then(res => dispatch({
        type: GET_PROVIDERS,
        payload: res.data.providers
    }))
};
/**
 * Gets dump of configured remotes from the rclone backend
 * @returns {Function}
 */
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