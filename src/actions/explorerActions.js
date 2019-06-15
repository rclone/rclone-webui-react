import axiosInstance from "../utils/API";
import {GET_CONFIG_FOR_REMOTE, GET_FILES_LIST, GET_REMOTE_LIST, REQUEST_ERROR, REQUEST_SUCCESS} from "./types";
import {addColonAtLast} from "../utils/Tools";

export const getFsInfo = (remoteName) => dispatch => {
    axiosInstance.post("operations/fsinfo", {fs: addColonAtLast(remoteName)})
        .then((res) => {
                dispatch({
                    type: GET_CONFIG_FOR_REMOTE,
                    status: REQUEST_SUCCESS,
                    payload: {[remoteName]: res.data},

                })
            },
            error => dispatch({
                type: GET_CONFIG_FOR_REMOTE,
                status: REQUEST_ERROR,
                payload: error
            }))
};

export const getRemoteNames = () => {
    return (dispatch, getState) => {
        const state = getState();
        // console.log(state);
        if (!state.remote.remotes || state.remote.remotes.length < 1) {

            axiosInstance.post("config/listremotes").then(res => dispatch({
                type: GET_REMOTE_LIST,
                status: REQUEST_SUCCESS,
                payload: res.data.remotes
            }), error => dispatch({
                type: GET_REMOTE_LIST,
                status: REQUEST_ERROR,
                payload: error
            }))
        }
    }
};


export const getFiles = (remoteName, remotePath) => dispatch => {
    let newRemoteName = "";
    if (remoteName !== "") {
        if (remoteName.indexOf('/') !== 0) {/*The name starts with a /: local Name*/
            newRemoteName = addColonAtLast(remoteName);
        } else {
            newRemoteName = remoteName;
        }


        let data = {
            fs: newRemoteName,
            remote: remotePath
        };

        const path = `${remoteName}-${remotePath}`;
        axiosInstance.post("operations/list", data).then(res => dispatch({
                type: GET_FILES_LIST,
                status: REQUEST_SUCCESS,
                payload: {path: path, filesList: res.data.list}
            }),
            error => dispatch({
                type: GET_FILES_LIST,
                status: REQUEST_ERROR,
                payload: {path: path, error}
            })
        )
    }

};

