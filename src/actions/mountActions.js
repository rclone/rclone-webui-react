import axiosInstance from "../utils/API/API";
import urls from "../utils/API/endpoint";
import {CREATE_MOUNT, GET_MOUNT_LIST, REMOVE_MOUNT, REQUEST_ERROR, REQUEST_SUCCESS} from "./types";

/**
 * Get the current mount lists and load into state
 * @returns {function(...[*]=)}
 */
export const getMountList = () => {
	return (dispatch) => {
		axiosInstance.post(urls.listMounts).then(res => {
			console.log(res);
			dispatch({
				type: GET_MOUNT_LIST,
				status: REQUEST_SUCCESS,
				payload: res.data
			})
		}, (error) => {
			dispatch({
				type: GET_MOUNT_LIST,
				status: REQUEST_ERROR,
				payload: error
			})
		})
	}
}

/**
 * Add a new mount location
 * @param fs                        {string}    Name of the remote eg mydrive:
 * @param mountPoint                {string}    Path to mount on the local filesystem where rclone is running
 * @param mountType                 {string}    One of "cmount", "mount", "mount2": Specifies what mountType rclone should use
 * @param vfsOpt					{{}}		vfs options
 * @param mountOpt					{{}}		mount options
 * @returns {function(...[*]=)}
 */
export const addMount = (fs, mountPoint, mountType, vfsOpt, mountOpt) => {
	if (!fs.endsWith(":")) fs = fs + ":";
	const type = CREATE_MOUNT
	return (dispatch) => {
		axiosInstance.post(urls.createMount, {fs, mountPoint, mountType, vfsOpt, mountOpt}).then(res => {
			dispatch({
				type,
				status: REQUEST_SUCCESS,
				payload: res.data
			})
		}, (error) => {
			dispatch({
				type,
				status: REQUEST_ERROR,
				payload: error
			})
		})
		dispatch(getMountList());

	}
}

/**
 * unmount removes an mounted location "mountPoint"
 * @param mountPoint                {string}    Path to location where the mount was created.
 * @returns {function(...[*]=)}
 */
export const unmount = (mountPoint) => {
	const type = REMOVE_MOUNT;
	return (dispatch) => {
		axiosInstance.post(urls.removeMount, {mountPoint}).then(res => {
			dispatch({
				type,
				status: REQUEST_SUCCESS,
				payload: res.data
			})

		}, (error) => {
			dispatch({
				type,
				status: REQUEST_ERROR,
				payload: error
			})
		})
		dispatch(getMountList());
	}
}


/**
 * unmountAll removes all mounts created by mount/mount
 * @returns {function(...[*]=)}
 */
export const unmountAll = () => {
	const type = REMOVE_MOUNT;
	return (dispatch) => {
		axiosInstance.post(urls.unmountAll).then(res => {
			dispatch({
				type,
				status: REQUEST_SUCCESS,
				payload: res.data
			})

		}, (error) => {
			dispatch({
				type,
				status: REQUEST_ERROR,
				payload: error
			})
		})
		dispatch(getMountList());
	}
}
