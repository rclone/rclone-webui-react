import {LOAD_IMAGE, REQUEST_ERROR, REQUEST_LOADING, REQUEST_SUCCESS} from "../actions/types";

const initialState = {};

export default function (state = initialState, action) {
    switch (action.type) {
        case LOAD_IMAGE:
            const {url, data, error} = action.payload;
            let save = state[url];
            if (!save)
                save = {
                    isLoading: false,
                    data: "",
                    error: "",
                    hasError: false
                };

            switch (action.status) {
                case REQUEST_LOADING:
                    save.isLoading = true;
                    save.hasError = false;
                    break;
                case REQUEST_SUCCESS:
                    save.isLoading = false;
                    save.hasError = false;
                    save.data = data;
                    break;
                case REQUEST_ERROR:
                    save.hasError = true;
                    save.isLoading = false;
                    save.error = error;
                    break;
                default:
                    break;
            }
            return {
                ...state,
                [url]: {...save}
            };

        default:
            return state;
    }
}