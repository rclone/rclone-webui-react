import {GET_CONFIG_FOR_REMOTE, GET_FILES_LIST, GET_REMOTE_LIST, REQUEST_ERROR, REQUEST_SUCCESS} from "../actions/types";

const initialState = {
    configs: {},
    remotes: [],
    files: {},
    hasError: false
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_CONFIG_FOR_REMOTE:
            if (action.status === REQUEST_SUCCESS)
                return {
                    ...state,
                    configs: {...state.configs, ...action.payload},
                    hasError: false
                };
            if (action.status === REQUEST_ERROR)
                return {
                    ...state,
                    error: action.payload,
                    hasError: true
                };
            break;
        case GET_REMOTE_LIST:
            if (action.status === REQUEST_SUCCESS)
                return {
                    ...state,
                    remotes: action.payload,
                    hasError: false
                };
            if (action.status === REQUEST_ERROR)
                return {
                    ...state,
                    error: action.payload,
                    hasError: true
                };
            break;
        case GET_FILES_LIST:
            if (action.status === REQUEST_SUCCESS) {
                return {
                    ...state,
                    files: {...state.files, [action.payload.path]: {time: new Date(), files: action.payload.filesList}},
                    hasError: false
                }
            }
            if (action.status === REQUEST_ERROR)
                return {
                    ...state,
                    files: {...state.files,
                        [action.payload.path]: {
                            time: new Date(),
                            files: [],
                            hasError: true,
                            error: action.payload.error
                        }
                    }
                };
            break;
        default:
            return state;
    }

}