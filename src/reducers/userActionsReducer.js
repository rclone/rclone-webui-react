import {CHANGE_AXIOS_INTERCEPTOR, CHANGE_IP_ADDRESS, CHANGE_USER_NAME_PASSWORD} from "../actions/types";
import axiosInstance from "../utils/API/API";
import {IP_ADDRESS_KEY, PASSWORD_KEY, USER_NAME_KEY} from "../utils/Constants";

const initialState = {
    auth: {userName: "", password: "", ipAddress: "http://localhost:5572", interceptor: ""}
};

/**
 * Specifies reducers for user actions like change username, password, ipAddress etc.
 * @param state
 * @param action
 * @returns {{auth: {password: string, ipAddress: string, userName: string}}|({auth}&{auth: ((initialState.auth&*)|({password, ipAddress, userName}&*))})}
 */
export default function (state = initialState, action) {
    switch (action.type) {
        case CHANGE_USER_NAME_PASSWORD:
        case CHANGE_IP_ADDRESS:
            state = {
                ...state,
                auth: {...state.auth, ...action.payload}
            };
            localStorage.setItem(USER_NAME_KEY, state.auth.userName);
            localStorage.setItem(PASSWORD_KEY, state.auth.password);
            localStorage.setItem(IP_ADDRESS_KEY, state.auth.ipAddress);
            return state;
        case CHANGE_AXIOS_INTERCEPTOR:
            if (state.auth.interceptor)
                axiosInstance.interceptors.request.eject(state.auth.interceptor);

            const interceptorID = axiosInstance.interceptors.request.use(
                config => {
                    config.headers.Authorization = 'Basic ' + btoa(localStorage.getItem(USER_NAME_KEY) + ":" + localStorage.getItem(PASSWORD_KEY));
                    config.baseURL = localStorage.getItem("ipAddress");
                    return config;
                },
                error => Promise.reject(error)
            );
            return {
                ...state,
                auth: {...state.auth, interceptor: interceptorID}
            };
        default:
            return state;
    }
}