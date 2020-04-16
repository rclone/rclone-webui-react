import axiosInstance from "../utils/API/API";
import {
	ADD_LAYOUT_CONTAINER,
	CHANGE_ACTIVE_REMOTE_CONTAINER,
	CHANGE_DISTRACTION_FREE_MODE,
	CHANGE_LAYOUT_COLS,
	GET_CONFIG_FOR_REMOTE,
	GET_FILES_LIST,
	GET_REMOTE_LIST,
	REMOVE_LAYOUT_CONTAINER,
	REQUEST_ERROR,
	REQUEST_SUCCESS
} from "./types";
import {addColonAtLast, isLocalRemoteName, makeUniqueID} from "../utils/Tools";
import {createPath, removePath} from "./explorerStateActions";
import urls from "../utils/API/endpoint";

/**
 * Gets the information regarding features, hashes from the rclone backend. Stores into redux store.
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
    axiosInstance.post(urls.getFsInfo, {fs: sentRemoteName})
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
 * Get only remote names from the rclone backend. Stores into redux store.
 * @returns {Function}
 */

export const getRemoteNames = () => {
    return (dispatch, getState) => {
        const state = getState();
        // console.log(state);
        if (!state.remote.remotes || state.remote.remotes.length < 1) {

            axiosInstance.post(urls.listRemotes).then(res => dispatch({
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
 * Gets the files for a specified remote path (remoteName + remotePath). Stores into redux store.
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
        axiosInstance.post(urls.getFilesList, data).then(res => dispatch({
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

/**
 * Changes the number of columns in current layout view.
 * @param mode          {string} Either "vertical or horizontal, defines the split type"
 * @param numCols       {number} Number of columns to create
 * @returns {Function}
 */
export const changeNumCols = (numCols, mode) => (dispatch) => {
    if (!numCols || numCols < 0) throw new Error(`Invalid number of cols:${numCols}`);


    // for (let i = 0; i < numCols; i++) {
    //     dispatch(createPath(i.toString()))
    // }

    dispatch({
        type: CHANGE_LAYOUT_COLS,
        payload: {
            numCols, mode
        }
    })
};

/**
 * Adds a new remote container.
 * @param paneID               {int} pane ID
 * @returns {Function}
 */
export const addRemoteContainer = (paneID) => (dispatch) => {
    const uniqueID = makeUniqueID(3);
    dispatch(createPath(uniqueID));
    dispatch(changeActiveRemoteContainer(uniqueID, paneID));
    dispatch({
        type: ADD_LAYOUT_CONTAINER,
        payload: {
            containerID: uniqueID,
            paneID
        }
    })
};


/**
 * Remove a new remote container.
 * @param containerID          {string} Container ID to remove
 * @param paneID               {int} pane ID
 * @returns {Function}
 */
export const removeRemoteContainer = (containerID, paneID) => (dispatch) => {
	dispatch(removePath(containerID));
    // console.log("Removing : " + containerID);
    dispatch({
        type: REMOVE_LAYOUT_CONTAINER,
        payload: {
            containerID, paneID
        }
    })
};

/**
 * Change active remote container.
 * @param containerID          {string} Container ID to remove
 * @param paneID               {int} pane ID
 * @returns {Function}
 */
export const changeActiveRemoteContainer = (containerID, paneID) => (dispatch) => {
    dispatch({
        type: CHANGE_ACTIVE_REMOTE_CONTAINER,
        payload: {
            containerID,
            paneID
        }
    })
};

/**
 * Enter or exit distraction free mode
 * @param shouldEnable  {boolean} Enable or disable distraction free mode.
 * @returns {Function}
 */
export const changeDistractionFreeMode = (shouldEnable) => dispatch => {
    dispatch({
        type: CHANGE_DISTRACTION_FREE_MODE,
        payload: shouldEnable
    })
};
