import {
    CHANGE_GRID_MODE,
    CHANGE_PATH,
    CHANGE_REMOTE_NAME,
    CHANGE_REMOTE_PATH,
    CHANGE_VISIBILITY_FILTER,
    CREATE_PATH,
    NAVIGATE_BACK,
    NAVIGATE_FWD
} from "./types";
import {getFiles} from "./explorerActions";

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

export const getFilesForContainerID = (containerID) => {

    return (dispatch, getState) => {
        const state = getState();
        const {remoteName, remotePath} = state.explorer.currentPaths[containerID];
        if (remoteName && remoteName !== "")
            dispatch(getFiles(remoteName, remotePath));
    }
};

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


export const createPath = (containerID) => dispatch => {

    dispatch({
        type: CREATE_PATH,
        id: containerID
    })
};

export const navigateUp = (containerID) => dispatch => {

    dispatch({
        type: NAVIGATE_BACK,
        id: containerID
    });
    dispatch(getFilesForContainerID(containerID))

};

export const navigateFwd = (containerID) => dispatch => {

    dispatch({
        type: NAVIGATE_FWD,
        id: containerID
    });
    dispatch(getFilesForContainerID(containerID))

};

export const navigateBack = (containerID) => dispatch => {

    dispatch({
        type: NAVIGATE_BACK,
        id: containerID
    });
    dispatch(getFilesForContainerID(containerID))

};

export const changeVisibilityFilter = (containerID, filter) => dispatch => {
    dispatch({
        type: CHANGE_VISIBILITY_FILTER,
        id: containerID,
        filter
    })
};

export const changeGridMode = (containerID, mode) => dispatch => {
    dispatch({
        type: CHANGE_GRID_MODE,
        id: containerID,
        mode
    })
};

