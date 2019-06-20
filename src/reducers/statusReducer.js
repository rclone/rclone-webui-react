import {FETCH_STATUS, REQUEST_ERROR, REQUEST_SUCCESS} from "../actions/types";

const initialState = {
    isConnected: false,
    jobs: {},
    speed: []
};

export default function (state = initialState, action) {
    switch (action.type) {
        case FETCH_STATUS:

            if (action.status === REQUEST_SUCCESS) {

                return {
                    ...state,
                    jobs: action.payload,
                    speed: [...state.speed, {elapsedTime: action.payload.elapsedTime, speed: action.payload.speed}],
                    isConnected: true
                };
            }
            if (action.status === REQUEST_ERROR) {
                return {
                    ...state,
                    error: action.payload,
                    isConnected: false
                };
            }
            break;

        default:
            return state;
    }
}