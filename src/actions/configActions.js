import axiosInstance from "../utils/API";
import {GET_PROVIDERS} from "./types";

export const getProviders = () => dispatch => {
    axiosInstance.post("/config/providers").then(res => dispatch({
        type: GET_PROVIDERS,
        payload: res.data.providers
    }))
};