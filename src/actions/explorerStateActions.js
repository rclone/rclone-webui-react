import {
    CHANGE_GRID_MODE,
    CHANGE_LOAD_IMAGES,
    CHANGE_PATH,
    CHANGE_REMOTE_NAME,
    CHANGE_REMOTE_PATH,
    CHANGE_SEARCH_QUERY,
    CHANGE_VISIBILITY_FILTER,
    CREATE_PATH,
    NAVIGATE_BACK,
    NAVIGATE_FWD,
    NAVIGATE_UP
} from "./types";
import {getFiles} from "./explorerActions";

/**
 * Changes the current path of a container using container ID
 * @param containerID {string}
 * @param remoteName {string} Name of the remote config/ ("/" for local path). May contain abc:bucketName for bucket based remotes
 * @param remotePath {string} Name of the path in the remote. eg: /tmp
 * @returns {Function}
 */
export const changePath = (containerID, remoteName, remotePath) => {
    return (dispatch) => {
        dispatch({
            type: CHANGE_PATH,
            remoteName: remoteName,
            id: containerID,
            remotePath: remotePath
        });
        dispatch(getFilesForContainerID(containerID))
    }
};

/**
 * Changes the current remote name for a particular container id
 * @param containerID {string}
 * @param remoteName {string}
 * @returns {Function}
 */
export const changeRemoteName = (containerID, remoteName) => {

    return (dispatch) => {
        dispatch({
            type: CHANGE_REMOTE_NAME,
            remoteName: remoteName,
            id: containerID,
            remotePath: ""
        });

        dispatch(getFilesForContainerID(containerID))
    }
};

/**
 * Issues a request to fetch the files in the current path of a container using container id.
 * @param containerID
 * @returns {Function}
 */
export const getFilesForContainerID = (containerID) => {

    return (dispatch, getState) => {
        const state = getState();
        const {remoteName, remotePath} = state.explorer.currentPaths[containerID];
        if (remoteName && remoteName !== "")
            dispatch(getFiles(remoteName, remotePath));
    }
};

/**
 * Changes the current remote path for a container ID without changing the remote name.
 * @param containerID {string}
 * @param remotePath {string}
 * @returns {Function}
 */
export const changeRemotePath = (containerID, remotePath) => {
    return (dispatch) => {
        dispatch({
            type: CHANGE_REMOTE_PATH,
            id: containerID,
            remotePath: remotePath
        });
        dispatch(getFilesForContainerID(containerID))
    }
};

/**
 * Creates an empty path for initialization of a container.
 * @param containerID {string}
 * @returns {Function}
 */
export const createPath = (containerID) => dispatch => {

    dispatch({
        type: CREATE_PATH,
        id: containerID
    })
};


/**
 * Computes and requests the path for going one level up in the working directory.
 * Eg: /tmp/abc -> navigateUp -> /tmp
 * @param containerID
 * @returns {Function}
 */
export const navigateUp = (containerID) => dispatch => {

    dispatch({
        type: NAVIGATE_UP,
        id: containerID
    });
    dispatch(getFilesForContainerID(containerID))

};

/**
 * Navigates one stack entry up.
 * Requires at least one backStack entry. (The navigateBack should have been called at least once).
 * @param containerID {string}
 * @returns {Function}
 */
export const navigateFwd = (containerID) => dispatch => {

    dispatch({
        type: NAVIGATE_FWD,
        id: containerID
    });
    dispatch(getFilesForContainerID(containerID))

};


/**
 * Navigates to one stack entry back. Works when used with navigateFwd, navigateUp.
 * Also requests for files in the new path
 * @param containerID
 * @returns {Function}
 */
export const navigateBack = (containerID) => dispatch => {

    dispatch({
        type: NAVIGATE_BACK,
        id: containerID
    });
    dispatch(getFilesForContainerID(containerID))

};

/**
 * Changes the visibility filter for a given container, the filter may contain values like Images, Videos to enable viewing of only those type of file inside a container.
 * @param containerID
 * @param filter {string}
 * @returns {Function}
 */
export const changeVisibilityFilter = (containerID, filter) => dispatch => {
    dispatch({
        type: CHANGE_VISIBILITY_FILTER,
        id: containerID,
        filter
    })
};

/**
 * Changes the view from Grid Mode to Card Mode or Card Mode to Grid Mode
 * @param containerID
 * @param mode {string}
 * @returns {Function}
 */
export const changeGridMode = (containerID, mode) => dispatch => {
    dispatch({
        type: CHANGE_GRID_MODE,
        id: containerID,
        mode
    })
};

/**
 * Changes the current search query to be searched in the container id. Filters the files and folders according to the new search query.
 * @param containerID
 * @param searchQuery
 * @returns {Function}
 */
export const setSearchQuery = (containerID, searchQuery) => dispatch => {
    dispatch({
        type: CHANGE_SEARCH_QUERY,
        id: containerID,
        searchQuery
    })
};

export const setLoadImages = (containerID, shouldLoad) => dispatch => {
    dispatch({
        type: CHANGE_LOAD_IMAGES,
        id: containerID,
        payload: shouldLoad
    })
};

