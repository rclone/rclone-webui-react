import {CREATE_MOUNT, GET_MOUNT_LIST, REMOVE_MOUNT, REQUEST_ERROR, REQUEST_SUCCESS} from "../actions/types";
import {toast} from "react-toastify";

const initialState = {
	currentMounts: [],
	mountError: null
};

export default function (state = initialState, action) {
	switch (action.type) {
		case CREATE_MOUNT:
			if (action.status === REQUEST_SUCCESS) {
				toast.info('Mount Success');
			} else if (action.status === REQUEST_ERROR) {
				toast.error('Error creating mount ' + action.payload);
			}
			break;
		case GET_MOUNT_LIST:
			if (action.status === REQUEST_SUCCESS) {
				return {
					...state,
					currentMounts: action.payload.mountPoints
				}
			} else if (action.status === REQUEST_ERROR) {
				return {
					...state,
					currentMounts: [],
					mountError: action.payload
				}
			}
			break;
		case REMOVE_MOUNT:
			if (action.status === REQUEST_SUCCESS) {
				toast.info('Unmount success');
			} else if (action.status === REQUEST_ERROR) {
				toast.error("Couldn't remove mount");
			}
			break;
		default:
			return state;
	}
	return state
}
