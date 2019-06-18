import {SIGNOUT_REQUEST} from "./types";


export const signOut = () => dispatch => {
    dispatch({
        type: SIGNOUT_REQUEST
    })
};
