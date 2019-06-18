import {GET_CONFIG_DUMP, GET_PROVIDERS, REQUEST_ERROR, REQUEST_SUCCESS} from "../actions/types";

const initialState = {
    providers: [],
    configDump: {},
    hasError: false,
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_PROVIDERS:
            return {
                ...state,
                providers: action.payload,
            };

        case GET_CONFIG_DUMP:
            if (action.status === REQUEST_SUCCESS)
                return {
                    ...state,
                    configDump: action.payload,
                    hasError: false
                };
            if (action.status === REQUEST_ERROR)
                return {
                    ...state,
                    hasError: true,
                    error: action.payload
                };
            break;
        default:
            return state;
    }
}