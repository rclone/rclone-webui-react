import {CHANGE_AUTH_KEY, CHANGE_AXIOS_INTERCEPTOR, CHANGE_IP_ADDRESS} from "../actions/types";
import axiosInstance from "../utils/API/API";
import {AUTH_KEY, IP_ADDRESS_KEY} from "../utils/Constants";

const initialState = {
    auth: {authKey: "", ipAddress: "http://localhost:5572", interceptor: ""}
};

/**
 * Specifies reducers for user actions like change username, password, ipAddress etc.
 * @param state
 * @param action
 * @returns {{auth: {authKey: string, ipAddress: string}}|({auth}&{auth: ((initialState.auth&*)|({password, ipAddress, userName}&*))})}
 */
export default function (state = initialState, action) {
    switch (action.type) {
        case CHANGE_AUTH_KEY:
        case CHANGE_IP_ADDRESS:
            state = {
                ...state,
                auth: {...state.auth, ...action.payload}
            };
            localStorage.setItem(AUTH_KEY, state.auth.authKey);
            // localStorage.setItem(USER_NAME_KEY, state.auth.userName);
            // localStorage.setItem(PASSWORD_KEY, state.auth.password);
            localStorage.setItem(IP_ADDRESS_KEY, state.auth.ipAddress);
            return state;
        case CHANGE_AXIOS_INTERCEPTOR:
            if (state.auth.interceptor)
                axiosInstance.interceptors.request.eject(state.auth.interceptor);

            const interceptorID = axiosInstance.interceptors.request.use(
                config => {
                    // Setup the configuration of authentication headers
                    config.headers.Authorization = 'Basic ' + localStorage.getItem(AUTH_KEY);
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