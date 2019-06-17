import {SIGNOUT_REQUEST} from "./types";


export const signOut = () => dispatch => {
    console.log("get Status");
    dispatch({
        type: SIGNOUT_REQUEST
    })
};
