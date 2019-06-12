import axiosInstance from "../utils/API";
import {GET_CONFIG_FOR_REMOTE, GET_FILES_LIST, GET_REMOTE_LIST, REQUEST_ERROR, REQUEST_SUCCESS} from "./types";
import {addColonAtLast} from "../utils/Tools";

export const getConfigForRemote = (remoteName) => dispatch => {
    axiosInstance.post("operations/fsinfo", {fs: addColonAtLast(remoteName)})
        .then((res) => dispatch({
                type: GET_CONFIG_FOR_REMOTE,
                status: REQUEST_SUCCESS,
                payload: {[remoteName]: res.data},

            }),
            error => dispatch({
                type: GET_CONFIG_FOR_REMOTE,
                status: REQUEST_ERROR,
                payload: error
            }))
};

export const getRemoteNames = () => dispatch => {
    axiosInstance.post("config/listremotes").then(res => dispatch({
        type: GET_REMOTE_LIST,
        status: REQUEST_SUCCESS,
        payload: res.data.remotes
    }), error => dispatch({
        type: GET_REMOTE_LIST,
        status: REQUEST_ERROR,
        payload: error
    }))
};

export const getFiles = (remoteName, remotePath) => dispatch => {
    remoteName = addColonAtLast(remoteName);


    let data = {
        fs: remoteName,
        remote: remotePath
    };


    axiosInstance.post("operations/list", data).then(res => dispatch({
        type: GET_FILES_LIST,
        status: REQUEST_SUCCESS,
        payload: {path: `${remoteName}:${remotePath}`, filesList: res.data.list}
    }))

};

