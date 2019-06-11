import {FETCH_STATUS_FAILED, FETCH_STATUS_SUCCESS} from "../actions/types";

const initialState = {
    isConnected: false,
    jobs: {}
};

export default function (state = initialState, action) {
    switch (action.type) {
        case FETCH_STATUS_SUCCESS:
            console.log("Reducer", action.payload);

            return {
                ...state,
                jobs: action.payload,
                isConnected: true
            };

        case FETCH_STATUS_FAILED:

            return {
                ...state,
                error: action.payload
            };

        default:
            return state;
    }
}