import {GET_RUNNING_JOBS, GET_STATUS_FOR_RUNNING_JOB, REQUEST_ERROR, REQUEST_SUCCESS} from "../actions/types";

const initialState = {
    runningJobs: [],
    runningJobsFetchError: {},
    jobStatus: {}
};

/**
 * Specifies the reducers for the job status and other remote ops.
 * @param state
 * @param action
 * @returns {{jobStatus: {}, runningJobs: Array, runningJobsFetchError: {}}|({jobStatus, runningJobs, runningJobsFetchError}&{runningJobs: *, runningJobsFetchError: undefined})|({jobStatus, runningJobs, runningJobsFetchError}&{runningJobsFetchError: *})|({jobStatus, runningJobs, runningJobsFetchError}&{jobStatus: (initialState.jobStatus|{})})}
 */
export default function (state = initialState, action) {
    switch (action.type) {
        case GET_RUNNING_JOBS:
            if (action.status === REQUEST_SUCCESS) {
                return {
                    ...state,
                    runningJobs: action.payload,
                    runningJobsFetchError: undefined
                }
            } else if (action.status === REQUEST_ERROR) {
                return {
                    ...state,
                    runningJobsFetchError: action.payload
                }
            }
            break;

        case GET_STATUS_FOR_RUNNING_JOB:
            if (action.status === REQUEST_SUCCESS) {
                return {
                    ...state,
                    jobStatus: {...state.jobStatus, [action.id]: {...action.payload, hasError: false}}
                }
            } else if (action.status === REQUEST_ERROR) {
                return {
                    ...state,
                    jobStatus: {...state.jobStatus, [action.id]: {...action.payload, hasError: true}}
                }
            }
            break;
        default:
            return state;
    }
}