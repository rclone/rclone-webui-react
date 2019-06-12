import {CHANGE_PATH, CHANGE_REMOTE_NAME, CHANGE_REMOTE_PATH, CREATE_PATH, NAVIGATE_BACK, NAVIGATE_FWD} from "./types";

export const changePath = (containerID, remoteName, remotePath) => {
    return (dispatch, getState) => {
        dispatch({
            type: CHANGE_PATH,
            remoteName: remoteName,
            id: containerID,
            remotePath: remotePath
        });
    }
};

export const changeRemoteName = (containerID, remoteName) => {
    return (dispatch, getState) => {
        dispatch({
            type: CHANGE_REMOTE_NAME,
            remoteName: remoteName,
            id: containerID,
            remotePath: ""
        });
    }
};

export const changeRemotePath = (containerID, remotePath) => {
    return (dispatch, getState) => {
        dispatch({
            type: CHANGE_REMOTE_PATH,
            id: containerID,
            remotePath: remotePath
        });
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
    })
};

export const navigateFwd = (containerID) => dispatch => {

    dispatch({
        type: NAVIGATE_FWD,
        id: containerID
    })
};

export const navigateBack = (containerID) => dispatch => {

    dispatch({
        type: NAVIGATE_BACK,
        id: containerID
    })
};

