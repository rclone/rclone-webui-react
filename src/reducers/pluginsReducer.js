import {ADD_TEST_PLUGIN, LOAD_PLUGINS, REQUEST_ERROR, REQUEST_SUCCESS} from "../actions/types";

const initialState = {
	loadedTestPlugins: {},
	loadedPlugins: {},
	error: ""
};

/**
 * Specifies the reducers for the job status and other remote ops.
 * @param state
 * @param action
 * @returns {{jobStatus: {}, runningJobs: Array, runningJobsFetchError: {}}|({jobStatus, runningJobs, runningJobsFetchError}&{runningJobs: *, runningJobsFetchError: undefined})|({jobStatus, runningJobs, runningJobsFetchError}&{runningJobsFetchError: *})|({jobStatus, runningJobs, runningJobsFetchError}&{jobStatus: (initialState.jobStatus|{})})}
 */
export default function (state = initialState, action) {
	switch (action.type) {
		case LOAD_PLUGINS:
			if (action.status === REQUEST_SUCCESS) {
				return {
					...state,
					loadedTestPlugins: action.payload.loadedTestPlugins,
					loadedPlugins: action.payload.loadedPlugins,
					error: ""
				}
			} else if (action.status === REQUEST_ERROR) {
				return {
					...state,
					loadedTestPlugins: {},
					loadedPlugins: {},
					error: action.payload
				}
			}
			break;
		case ADD_TEST_PLUGIN:
			return state;
		default:
			return state;
	}
}
