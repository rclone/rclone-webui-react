import {CHANGE_AXIOS_INTERCEPTOR, CHANGE_IP_ADDRESS, CHANGE_USER_NAME_PASSWORD, SIGNOUT_REQUEST} from "./types";

/**
 * Sign out the current user and delete the redux cache
 * @returns {Function}
 */
export const signOut = () => dispatch => {
    dispatch({
        type: SIGNOUT_REQUEST
    })
};

/**
 * Set new username and password for the rclone auth.
 * @param userName      {string}    New username to change.
 * @param password      {string}    New Password to change.
 * @returns             {Function}
 */
export const changeUserNamePassword = (userName, password) => dispatch => {
    dispatch({
        type: CHANGE_USER_NAME_PASSWORD,
        payload: {userName, password}
    });
    dispatch({
        type: CHANGE_AXIOS_INTERCEPTOR
    });
};

/**
 * Change the IPAddress of the rclone backend.
 * @param ipAddress
 * @returns {Function}
 */
export const changeIPAddress = (ipAddress) => dispatch => {
    dispatch({
        type: CHANGE_IP_ADDRESS,
        payload: {ipAddress}
    });
    dispatch({
        type: CHANGE_AXIOS_INTERCEPTOR
    });
};


