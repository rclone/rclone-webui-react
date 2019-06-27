import {SIGNOUT_REQUEST} from "./types";

/**
 * Sign out the current user and delete the redux cache
 * @returns {Function}
 */
export const signOut = () => dispatch => {
    dispatch({
        type: SIGNOUT_REQUEST
    })
};
