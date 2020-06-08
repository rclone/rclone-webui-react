import {GET_VERSION, REQUEST_ERROR, REQUEST_SUCCESS} from './types';
import {getRcloneVersion} from "rclone-api";

export const getVersion = () => {
    return dispatch => {
        getRcloneVersion().then(
            res =>
                dispatch({
                    type: GET_VERSION,
                    status: REQUEST_SUCCESS,
                    payload: res
                }),
            error =>
                dispatch({
                    type: GET_VERSION,
                    status: REQUEST_ERROR,
                    payload: error
                })
        );
    };
};
