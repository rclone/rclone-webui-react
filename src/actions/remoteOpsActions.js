import {
    CREATE_PUBLIC_LINK,
    GET_RUNNING_JOBS,
    GET_STATUS_FOR_RUNNING_JOB,
    REQUEST_ERROR,
    REQUEST_SUCCESS
} from './types';
import axiosInstance from "../utils/API/API";
import {toast} from "react-toastify";

export const createPublicLink = (remoteName, remotePath) => {
    return (dispatch) => {
        axiosInstance.post("operations/publiclink", {fs: remoteName, remote: remotePath}).then((res) =>
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

export const getRunningJobs = () => dispatch => {
    axiosInstance.post("job/list").then((res) => {
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

export const getStatusForRunningJob = (jobId) => dispatch => {
    axiosInstance.post("job/status", {jobid: jobId}).then((res) => {
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