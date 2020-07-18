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

const saveMaxSpeedPoints = 50;
/**
 * Specifies reducers for status check of the rclone backend.
 * @param state
 * @param action
 * @returns {({checkStatus, bandwidth, jobs, isConnected, runningAvgSpeed, speed}&{isConnected: boolean, error: *})|{checkStatus: boolean, bandwidth: {}, jobs: {}, isConnected: boolean, runningAvgSpeed: number, speed: Array}|({checkStatus, bandwidth, jobs, isConnected, runningAvgSpeed, speed}&{bandwidth: *})|({checkStatus, bandwidth, jobs, isConnected, runningAvgSpeed, speed}&{jobs: *, isConnected: boolean, runningAvgSpeed: number, speed: *[]})|({checkStatus, bandwidth, jobs, isConnected, runningAvgSpeed, speed}&{checkStatus: *})}
 */
export default function (state = initialState, action) {
    switch (action.type) {
        case FETCH_STATUS:

            if (action.status === REQUEST_SUCCESS) {
                const curSpeed = action.payload.speed;
                let cma = state.runningAvgSpeed;
                // let totalElements = state.speed.length;
                // if (!totalElements) totalElements = 1;

                let runningAvgSpeed = Math.trunc((cma + ((curSpeed - cma) / 50)));
                const speedArray = [...state.speed, {
                    elapsedTime: Math.trunc(action.payload.elapsedTime),
                    speed: Math.trunc(action.payload.speed),
                    speedAvg: Math.trunc(runningAvgSpeed)
                }];
                const arrLength = speedArray.length;
                if (arrLength > saveMaxSpeedPoints) {
                    speedArray.splice(0, arrLength - saveMaxSpeedPoints);
                }

                return {
                    ...state,
                    jobs: action.payload,
                    runningAvgSpeed,
                    speed: speedArray,
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