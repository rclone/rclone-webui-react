import {GET_CONFIG_DUMP, GET_PROVIDERS, REQUEST_ERROR, REQUEST_SUCCESS} from "./types";
import {getAllConfigDump, getAllProviders} from "rclone-api";

/**
 * Gets all Providers from the rclone UI Backend
 * @returns {Function}
 */
export const getProviders = () => dispatch => {
    getAllProviders().then(data => dispatch({
        type: GET_PROVIDERS,
        payload: data.providers
    }))
};
/**
 * Gets dump of configured remotes from the rclone backend
 * @returns {Function}
 */
export const getConfigDump = () => dispatch => {
    getAllConfigDump().then(res => dispatch({
        type: GET_CONFIG_DUMP,
        status: REQUEST_SUCCESS,
        payload: res
    }), error => dispatch({
        type: GET_CONFIG_DUMP,
        status: REQUEST_ERROR,
        payload: error
    }))
};
