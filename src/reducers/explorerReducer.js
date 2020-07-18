import {
	ADD_LAYOUT_CONTAINER,
	CHANGE_ACTIVE_REMOTE_CONTAINER,
	CHANGE_DISTRACTION_FREE_MODE,
	CHANGE_LAYOUT_COLS,
	GET_CONFIG_FOR_REMOTE,
	GET_FILES_LIST,
	GET_REMOTE_LIST,
	REMOVE_LAYOUT_CONTAINER,
	REQUEST_ERROR,
	REQUEST_SUCCESS
} from "../actions/types";

const initialState = {
	configs: {},
	remotes: [],
	files: {},
	hasError: false,
	numContainers: 0,
	containers: [],
	activeRemoteContainerID: {},
	distractionFreeMode: false,
	numCols: 1
};
/**
 * Specifies the explorer specific reducers for the redux actions.
 * @param state
 * @param action
 * @returns {{configs: {}, remotes: Array, files: {}, hasError: boolean}|({configs, remotes, files, hasError}&{files: (initialState.files|{})})|({configs, remotes, files, hasError}&{files: (initialState.files|{}), hasError: boolean})|({configs, remotes, files, hasError}&{hasError: boolean, error: *})|({configs, remotes, files, hasError}&{configs: ((initialState.configs&*)|({}&*)), hasError: boolean})|({configs, remotes, files, hasError}&{remotes: *, hasError: boolean})}
 */
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
					files: {
						...state.files,
						[action.payload.path]: {
							time: new Date(),
							files: [],
							hasError: true,
							error: action.payload.error
						}
					}
				};
			break;

		case ADD_LAYOUT_CONTAINER:
			state.containers.push({ID: action.payload.containerID, paneID: action.payload.paneID});
			state.numContainers = state.containers.length;
			state.activeRemoteContainerID = {
				...state.activeRemoteContainerID,
				[action.payload.paneID]: action.payload.containerID
			};
			return {...state};
		case REMOVE_LAYOUT_CONTAINER:
			// Remove the specified containerID from containers
			state.containers = state.containers.filter(item => item.ID !== action.payload.containerID);
			state.numContainers = state.containers.length;
			const lastItem = state.containers.filter(item => item.paneID === action.payload.paneID).slice(-1).pop();
			state.activeRemoteContainerID = {
				...state.activeRemoteContainerID,
				[action.payload.paneID]: (lastItem ? lastItem.ID : undefined)
			};

			return {...state};
		case CHANGE_ACTIVE_REMOTE_CONTAINER:
			state.activeRemoteContainerID = {
				...state.activeRemoteContainerID,
				[action.payload.paneID]: action.payload.containerID
			};
			return {...state};
		case CHANGE_LAYOUT_COLS:
			return {
				...state,
				numCols: action.payload.numCols
			};
		case CHANGE_DISTRACTION_FREE_MODE:
			return {
				...state,
				distractionFreeMode: action.payload
			};
		default:
			return state;
	}

}
