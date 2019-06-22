import {CREATE_PUBLIC_LINK, REQUEST_ERROR, REQUEST_SUCCESS} from './types';
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