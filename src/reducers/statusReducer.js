import {
    ENABLE_STATUS_CHECK,
    FETCH_STATUS,
    GET_BANDWIDTH,
    REQUEST_ERROR,
    REQUEST_SUCCESS,
    SET_BANDWIDTH
} from "../actions/types";

const initialState = {
    isConnected: false,
    jobs: {},
    speed: [],
    runningAvgSpeed: 0,
    checkStatus: true,
    bandwidth: {}
};

export default function (state = initialState, action) {
    switch (action.type) {
        case FETCH_STATUS:

            if (action.status === REQUEST_SUCCESS) {
                const curSpeed = action.payload.speed;
                let cma = state.runningAvgSpeed;
                let totalElements = state.speed.length;
                if (!totalElements) totalElements = 1;
                let runningAvgSpeed = cma + ((curSpeed - cma) / 50);


                return {
                    ...state,
                    jobs: action.payload,
                    runningAvgSpeed,
                    speed: [...state.speed, {
                        elapsedTime: action.payload.elapsedTime,
                        speed: action.payload.speed,
                        speedAvg: runningAvgSpeed
                    }],
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
        case ENABLE_STATUS_CHECK:
            return {
                ...state,
                checkStatus: action.payload
            };
        case SET_BANDWIDTH:
        case GET_BANDWIDTH:
            return {
                ...state,
                bandwidth: action.payload
            };
        default:
            return state;
    }
}