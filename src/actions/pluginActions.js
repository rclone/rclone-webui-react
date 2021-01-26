import axiosInstance from "../utils/API/API";
import urls from "../utils/API/endpoint";
import {ADD_TEST_PLUGIN, LOAD_PLUGINS, REQUEST_ERROR, REQUEST_SUCCESS} from "./types";
import {toast} from "react-toastify";

/**
 * Load test plugins
 * @returns {Function}
 */
export const loadTestPlugins = () => {
	return (dispatch) => {
		axiosInstance.post(urls.listPlugins).then((res) => {
				dispatch({
					type: LOAD_PLUGINS,
					status: REQUEST_SUCCESS,
					payload: res.data
				})
			},
			(error) => {
				dispatch({
					type: LOAD_PLUGINS,
					status: REQUEST_ERROR,
					payload: error
				})
			});
	}
};

/**
 * Add a test plugin
 * @param pluginName {string}    Name of the plugin
 * @param pluginUrl  {string}    Github url of the plugin to load from
 * @return {function(...[*]=)}
 */
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


/**
 * Load plugins from rclone
 * @return {function(...[*]=)}
 */
export const getPlugins = () => (dispatch) => {
	axiosInstance.post(urls.listPlugins).then(res => {
			dispatch({
				type: LOAD_PLUGINS,
				status: REQUEST_SUCCESS,
				payload: res.data
			})
		},
		(error) => {
			dispatch({
				type: LOAD_PLUGINS,
				status: REQUEST_ERROR,
				payload: error
			})
		}
	)

}

/**
 * Add a plugin using url of that plugin
 * @param pluginURL
 * @return {function(...[*]=)}
 */
export const addPlugin = (pluginURL) => dispatch => {
	axiosInstance.post(urls.addPlugin, {url: pluginURL}).then(res => {
		toast.info(`Plugin ${pluginURL} added successfully`);
		// reload plugins database
		dispatch(getPlugins())
	}, (error) => {
		toast.error(`Error adding plugin. Please try again: ${error.data}`);
	})
}
