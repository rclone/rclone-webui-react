import {
	CHANGE_GRID_MODE,
	CHANGE_LOAD_IMAGES,
	CHANGE_PATH,
	CHANGE_REMOTE_NAME,
	CHANGE_REMOTE_PATH,
	CHANGE_SEARCH_QUERY,
	CHANGE_SORT_FILTER,
	CHANGE_VISIBILITY_FILTER,
	CREATE_PATH,
	NAVIGATE_BACK,
	NAVIGATE_FWD,
	NAVIGATE_UP,
	REMOVE_PATH
} from "../actions/types";
import BackStack from "../utils/classes/BackStack";

const initialState = {
    backStacks: {},
    currentPaths: {},
    visibilityFilters: {},
    gridMode: {},
    searchQueries: {},
    loadImages: {},
    sortFilters: {},
    sortFiltersAscending: {}
};

/**
 * Specifies the reducers for explorer state manipulation.
 * @param state {$ObjMap}
 * @param action {$ObjMap}
 * @returns {{currentPaths: {}, visibilityFilters: {}, gridMode: {}, searchQueries: {}, backStacks: {}}|({currentPaths, visibilityFilters, gridMode, searchQueries, backStacks}&{currentPaths: (initialState.currentPaths|{}), visibilityFilters: (initialState.visibilityFilters|{}), gridMode: (initialState.gridMode|{}), searchQueries: (initialState.searchQueries|{}), backStacks: (initialState.backStacks|{})})}
 */
export default function (state = initialState, action) {

    const id = action.id;
    if (id) {

        let backStack = state.backStacks[id];
        if (!backStack || !(backStack instanceof BackStack)) {


            if (!(backStack instanceof BackStack)) {
                // Redux dosen't store the internal functions of class objects when serialized. So as a work around,
                // if the backstack is not an instance of backStack, i.e. its methods are missing,
                // create a new backstack with current data
                backStack = new BackStack(backStack)
            } else {
                backStack = new BackStack();
            }
        }

        let remoteName = action.remoteName;
        let remotePath = action.remotePath;

		if (!remoteName) remoteName = "";
		if (!remotePath) remotePath = "";
		const data = {
			remoteName: remoteName,
			remotePath: remotePath
		};

		let visibilityFilter = state.visibilityFilters[id];
		let gridMode = state.gridMode[id];
		if (!gridMode) gridMode = "list";
		let searchQuery = "";
		let loadImages = state.loadImages[id];
		if (!loadImages) loadImages = false;

		let sortFilterAscending = state.sortFiltersAscending[id];
		if (!sortFilterAscending) sortFilterAscending = true;
		let sortFilter = state.sortFilters[id];
		if (!sortFilter) sortFilter = "name";

		switch (action.type) {
            case CHANGE_PATH:
                backStack.push(data);
                break;

            case CHANGE_REMOTE_NAME:
                if (remoteName.indexOf('/') === 0) {/*The name starts with a /: local Name*/
                    remotePath = remoteName;
                    remoteName = "/";

                } else {
                    remotePath = "";
                }
                backStack.empty();
                backStack.push({remoteName: remoteName, remotePath: remotePath});
                // ptr++;

                break;

            case CHANGE_REMOTE_PATH:
				backStack.push({remoteName: backStack.peek().remoteName, remotePath: remotePath});
				// ptr++;

				break;

			case CREATE_PATH:
				if (!backStack || !(backStack instanceof BackStack))
					backStack = new BackStack();
				break;
			case REMOVE_PATH:
				return {
					...state,
					backStacks: {...state.backStacks, [id]: undefined},
					currentPaths: {...state.currentPaths, [id]: undefined},
					visibilityFilters: {...state.visibilityFilters, [id]: undefined},
					gridMode: {...state.gridMode, [id]: undefined},
					searchQueries: {...state.searchQueries, [id]: undefined},
					loadImages: {...state.loadImages, [id]: undefined},
					sortFilters: {...state.sortFilters, [id]: undefined},
					sortFiltersAscending: {...state.sortFiltersAscending, [id]: undefined},
				};
			// break;
			case NAVIGATE_UP:
				// TODO: Write logic for up, which will navigate one directory up
				let current = backStack.peek();

				if (current.remotePath && current.remotePath !== "") {
					const splitPath = current.remotePath.split('/');
					current.remotePath = "";
					if (splitPath.length > 1)
						for (let i = 0; i < splitPath.length - 1; i++) {
							current.remotePath = current.remotePath + ((i !== 0) ? '/' : '') + splitPath[i];
                        }
                }
                backStack.push(current);
                break;

            case NAVIGATE_FWD:
                backStack.moveForward();
                break;

            case NAVIGATE_BACK:
                backStack.moveBack();
                break;
            case CHANGE_VISIBILITY_FILTER:
				if (action.filter)
					visibilityFilter = action.filter;
				else
					visibilityFilter = "";
                break;
            case CHANGE_GRID_MODE:
                if (action.mode) {
                    gridMode = action.mode;
                }
                break;

            case CHANGE_SEARCH_QUERY:
                searchQuery = action.searchQuery;
                break;

            case CHANGE_LOAD_IMAGES:
                loadImages = action.payload;
                break;
            case CHANGE_SORT_FILTER:
                sortFilter = action.payload.sortFilter;
                sortFilterAscending =  action.payload.sortFilterAscending;
                break;
            default:
                break;
        }
        return {
            ...state,
            backStacks: {...state.backStacks, [id]: backStack},
            currentPaths: {...state.currentPaths, [id]: {...backStack.peek()}},
            visibilityFilters: {...state.visibilityFilters, [id]: visibilityFilter},
            gridMode: {...state.gridMode, [id]: gridMode},
            searchQueries: {...state.searchQueries, [id]: searchQuery},
            loadImages: {...state.loadImages, [id]: loadImages},
            sortFilters: {...state.sortFilters, [id]: sortFilter},
            sortFiltersAscending: {...state.sortFiltersAscending, [id]: sortFilterAscending},
        };
    } else {
        // console.error("ID is unexpectedly null");
        return state;
    }


};
