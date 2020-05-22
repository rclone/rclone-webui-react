import {ADD_TEST_PLUGIN, GET_TEST_PLUGINS, REQUEST_ERROR, REQUEST_SUCCESS} from "../actions/types";

const initialState = {
	loadedTestPlugins: {},
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
		case GET_TEST_PLUGINS:
			if (action.status === REQUEST_SUCCESS) {
				return {
					...state,
					loadedTestPlugins: action.payload.loadedTestPlugins,
				}
			} else if (action.status === REQUEST_ERROR) {
				return {
					...state,
					loadedTestPlugins: undefined,
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
