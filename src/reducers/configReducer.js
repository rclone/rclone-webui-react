import {GET_PROVIDERS} from "../actions/types";

const initialState = {
    providers: [],
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_PROVIDERS:
            console.log("config reducer", action.payload);

            return {
                ...state,
                providers: action.payload,
            };

        default:
            return state;
    }
}