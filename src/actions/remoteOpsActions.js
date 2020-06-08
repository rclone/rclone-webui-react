import {
    CREATE_PUBLIC_LINK,
    GET_RUNNING_JOBS,
    GET_STATUS_FOR_RUNNING_JOB,
    REQUEST_ERROR,
    REQUEST_SUCCESS
} from './types';
import {toast} from "react-toastify";
import {createNewPublicLink, getJobStatus} from "rclone-api";

/**
 * Create a public link for a supported remote
 * @param remoteName {string}
 * @param remotePath {string}
 * @returns {Function}
 */
export const createPublicLink = (remoteName, remotePath) => {
    return (dispatch) => {
        createNewPublicLink(remoteName, remotePath).then((res) =>
                dispatch({
                    type: CREATE_PUBLIC_LINK,
                    status: REQUEST_SUCCESS,
                    payload: res
                }),
            (error) => {
                dispatch({
                    type: CREATE_PUBLIC_LINK,
                    status: REQUEST_ERROR,
                    payload: error
                });
                toast.error(`Error creating link. Please try again: ${error.data}`);
            }
        )
    }

};

/**
 * Gets the running jobs status from job/list on the rclone ui backend
 * @returns {Function}
 */

export const getRunningJobs = () => dispatch => {
    getRunningJobs().then((res) => {
            dispatch({
                type: GET_RUNNING_JOBS,
                status: REQUEST_SUCCESS,
                payload: res
            })
        },
        (err) => {
            dispatch({
                type: GET_RUNNING_JOBS,
                status: REQUEST_ERROR,
                payload: err
            });
        })
};

/**
 * Gets the current status for a running job given a valid jobID
 * @param jobId {number}
 * @returns {Function}
 */
export const getStatusForRunningJob = (jobId) => dispatch => {
    getJobStatus(jobId).then((res) => {
            dispatch({
                type: GET_STATUS_FOR_RUNNING_JOB,
                status: REQUEST_SUCCESS,
                id: jobId,
                payload: res
            })
        },
        (err) => {
            dispatch({
                type: GET_STATUS_FOR_RUNNING_JOB,
                status: REQUEST_ERROR,
                id: jobId,
                payload: err
            });
        })
};
