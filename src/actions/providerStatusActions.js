import {addColonAtLast, isLocalRemoteName} from "../utils/Tools";
import {GET_REMOTE_ABOUT, REQUEST_ERROR, REQUEST_SUCCESS} from "../actions/types";
import {getRemoteInfo} from "rclone-api";

/**
 * Gets the information of a provider
 * @param containerID
 * @returns {Function}
 */
export const getAboutRemote = (containerID) => {
    return (dispatch, getState) => {

        const state = getState();
        const currentPath = state.explorer.currentPaths[containerID];

        let {remoteName} = currentPath;

        if (remoteName) {
            if (!isLocalRemoteName(remoteName)) {
                remoteName = addColonAtLast(remoteName);
            }

            // Remove the previous data
            dispatch({
                type: GET_REMOTE_ABOUT,
                status: REQUEST_SUCCESS,
                id: containerID,
                payload: {}
            });

            getRemoteInfo(remoteName)
                .then((res) => {
                    dispatch({
                        type: GET_REMOTE_ABOUT,
                        status: REQUEST_SUCCESS,
                        id: containerID,
                        payload: res
                    })
                }, (res) => {
                    dispatch({
                        type: GET_REMOTE_ABOUT,
                        status: REQUEST_ERROR,
                        id: containerID,
                        error: res
                    })
                })
        }
    }
};
