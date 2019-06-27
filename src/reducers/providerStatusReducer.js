import {GET_REMOTE_ABOUT, REQUEST_ERROR, REQUEST_SUCCESS} from "../actions/types";

const initialState = {
    about: {}
};
/**
 * Specifies reducers for getting information about the current providers.
 * @param state
 * @param action
 * @returns {{about: {}}|({about}&{about: (initialState.about|{})})}
 */
export default function (state = initialState, action) {

    switch (action.type) {
        case GET_REMOTE_ABOUT:
            if (action.status === REQUEST_SUCCESS) {
                return {...state, about: {...state.about, [action.id]: action.payload}};
            } else if (action.status === REQUEST_ERROR) {
                // console.log("Error occurred");
                return state;
            }
            break;

        default:
            return state;

    }
}