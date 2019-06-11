import {FETCH_STATUS} from "../actions/types";

const initialState = {
    isConnected: false,
    jobs: {}
};

export default function (state = initialState, action) {
    switch (action.type) {
        case FETCH_STATUS:
            console.log("Reducer", action.payload);

            return {
                ...state,
                jobs: action.payload,
                isConnected: true
            };

        default:
            return state;
    }
}