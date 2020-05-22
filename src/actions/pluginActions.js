import axiosInstance from "../utils/API/API";
import urls from "../utils/API/endpoint";
import {GET_TEST_PLUGINS, REQUEST_ERROR, REQUEST_SUCCESS} from "./types";

/**
 * Load test plugins
 * @returns {Function}
 */
export const loadTestPlugins = () => {
	return (dispatch) => {
		axiosInstance.post(urls.listTestPlugins).then((res) => {
				dispatch({
					type: GET_TEST_PLUGINS,
					status: REQUEST_SUCCESS,
					payload: res.data
				})
			},
			(error) => {
				dispatch({
					type: GET_TEST_PLUGINS,
					status: REQUEST_ERROR,
					payload: error
				})
			});
	}
};
