import {
    CREATE_PUBLIC_LINK,
    GET_RUNNING_JOBS,
    GET_STATUS_FOR_RUNNING_JOB,
    REQUEST_ERROR,
    REQUEST_SUCCESS
} from './types';
import axiosInstance from "../utils/API/API";
import {toast} from "react-toastify";
import urls from "../utils/API/endpoint";

/**
 * Create a public link for a supported remote
 * @param remoteName {string}
 * @param remotePath {string}
 * @returns {Function}
 */
export const createPublicLink = (remoteName, remotePath) => {
    return (dispatch) => {
        axiosInstance.post(urls.createPublicLink, {fs: remoteName, remote: remotePath}).then((res) =>
                dispatch({
                    type: CREATE_PUBLIC_LINK,
                    status: REQUEST_SUCCESS,
                    payload: res.data
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
    axiosInstance.post(urls.getRunningJobs).then((res) => {
            dispatch({
                type: GET_RUNNING_JOBS,
                status: REQUEST_SUCCESS,
                payload: res.data
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
    axiosInstance.post(urls.getStatusForJob, {jobid: jobId}).then((res) => {
            dispatch({
                type: GET_STATUS_FOR_RUNNING_JOB,
                status: REQUEST_SUCCESS,
                id: jobId,
                payload: res.data
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