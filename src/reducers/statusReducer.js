import {FETCH_STATUS, REQUEST_ERROR, REQUEST_SUCCESS} from "../actions/types";

const initialState = {
    isConnected: false,
    jobs: {}
};

export default function (state = initialState, action) {
    switch (action.type) {
        case FETCH_STATUS:
            if (action.status === REQUEST_SUCCESS) {

                return {
                    ...state,
                    jobs: action.payload,
                    isConnected: true
                };
            }
            if (action.status === REQUEST_ERROR) {
                return {
                    ...state,
                    error: action.payload
                };
            }
            break;

        default:
            return state;
    }
}