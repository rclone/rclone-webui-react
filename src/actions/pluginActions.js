import axiosInstance from "../utils/API/API";
import urls from "../utils/API/endpoint";
import {ADD_TEST_PLUGIN, GET_TEST_PLUGINS, REQUEST_ERROR, REQUEST_SUCCESS} from "./types";

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

export const addTestPlugin = (pluginName, pluginUrl) => (dispatch) => {
	axiosInstance.post(urls.addTestPlugin, {name: pluginName, loadUrl: pluginUrl, test: true}).then(res => {
		dispatch(loadTestPlugins());
	}, (error) => {
		dispatch({
			type: ADD_TEST_PLUGIN,
			status: REQUEST_ERROR,
			payload: error
		})
	})
}
