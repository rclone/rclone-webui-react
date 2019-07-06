import {LOAD_IMAGE, REQUEST_ERROR, REQUEST_LOADING, REQUEST_SUCCESS} from "./types";
import axiosInstance from "../utils/API/API";

export const downloadImage = (url) => dispatch => {
    if (!url) throw new Error("Cannot have null url");
    dispatch({
        type: LOAD_IMAGE,
        status: REQUEST_LOADING,
        payload: {
            url
        }
    });

    axiosInstance.get(url, {
        responseType: 'arraybuffer'
    }).then((res) => {
        console.log(res);
        const imgFile = new Blob([res.data]);
        const imgUrl = URL.createObjectURL(imgFile);
        dispatch({
            type: LOAD_IMAGE,
            status: REQUEST_SUCCESS,
            payload: {
                url,
                data: imgUrl
            }
        })
    }, (err) => {
        dispatch({
            type: LOAD_IMAGE,
            status: REQUEST_ERROR,
            payload: {
                url,
                error: err
            }
        })
    });
};