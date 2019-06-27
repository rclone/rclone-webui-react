import axiosInstance from "../utils/API/API";
import {GET_CONFIG_FOR_REMOTE, GET_FILES_LIST, GET_REMOTE_LIST, REQUEST_ERROR, REQUEST_SUCCESS} from "./types";
import {addColonAtLast, isLocalRemoteName} from "../utils/Tools";

/**
 * Gets the information regarding features, hashes from the rclone backend.
 * @param remoteName {string} The name of the remote
 * @returns {Function}
 */
export const getFsInfo = (remoteName) => dispatch => {

    let sentRemoteName;
    let setRemoteName;

    if (isLocalRemoteName(remoteName)) {
        sentRemoteName = setRemoteName = "/";

    } else {
        setRemoteName = remoteName.split(':')[0];
        sentRemoteName = addColonAtLast(setRemoteName);
    }
    // console.log("Actual: ", sentRemoteName);
    axiosInstance.post("operations/fsinfo", {fs: sentRemoteName})
        .then((res) => {
                dispatch({
                    type: GET_CONFIG_FOR_REMOTE,
                    status: REQUEST_SUCCESS,
                    payload: {[setRemoteName]: res.data},

                })
            },
            error => dispatch({
                type: GET_CONFIG_FOR_REMOTE,
                status: REQUEST_ERROR,
                payload: error
            }))

};

/**
 * Get only remote names from the rclone backend.
 * @returns {Function}
 */

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

/**
 * Gets the files for a specified remote path (remoteName + remotePath).
 * @param remoteName {string} Name of the remote config/ ("/" for local path). May contain abc:bucketName for bucket based remotes
 * @param remotePath {string} Name of the path in the remote
 * @returns {Function}
 */
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

