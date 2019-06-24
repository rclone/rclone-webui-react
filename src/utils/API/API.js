import axios from "axios";
import {isLocalRemoteName} from "../Tools";

// Global level axios configuration. These settings are automatically used in other places by using an axiosInstance instead of axios directly
let axiosInstance = axios.create({
    baseURL: localStorage.getItem('ipAddress'),
    headers: {'Content-Type': 'application/json'},
    responseType: "json"
});


axiosInstance.interceptors.request.use(
    config => {
        config.headers.Authorization = 'Basic ' + btoa(localStorage.getItem('username') + ":" + localStorage.getItem('password'));
        // console.log(config, localStorage.getItem('username'), localStorage.getItem('password'));
        return config;
    },
    error => Promise.reject(error)
);

/**
 * Helper Method for moving a file/directory.
 * @param srcFs     {string}    remoteName of the source
 * @param srcRemote {string}    remotePath of the source
 * @param dstFs     {string}    remoteName of the destination
 * @param dstRemote {string}    remotePath of the destination
 * @param Name      {string}    name of the file/directory
 * @param IsDir     {boolean}   Determines whether the current path is a directory (true) or a file (false)
 * @returns         {Promise<*>}
 */
export function performMoveFile(srcFs, srcRemote, dstFs, dstRemote, Name, IsDir) {
    return performCopyOrMoveFile(srcFs, srcRemote, dstFs, dstRemote, Name, IsDir, 'move');
}

/**
 * Helper Method for copying a file/directory.
 * @param srcFs     {string}    remoteName of the source
 * @param srcRemote {string}    remotePath of the source
 * @param dstFs     {string}    remoteName of the destination
 * @param dstRemote {string}    remotePath of the destination
 * @param Name      {string}    name of the file/directory
 * @param IsDir     {boolean}   Determines whether the current path is a directory (true) or a file (false)
 * @returns         {Promise<*>}
 */
export function performCopyFile(srcFs, srcRemote, dstFs, dstRemote, Name, IsDir) {

    return performCopyOrMoveFile(srcFs, srcRemote, dstFs, dstRemote, Name, IsDir, 'copy');
}

/**
 * Perform the actual copying/ moving of a file/directory.
 * @access private
 * @param srcFs     {string}    remoteName of the source
 * @param srcRemote {string}    remotePath of the source
 * @param dstFs     {string}    remoteName of the destination
 * @param dstRemote {string}    remotePath of the destination
 * @param Name      {string}    name of the file/directory
 * @param IsDir     {boolean}   Determines whether the current path is a directory (true) or a file (false)
 * @param mode      {string}    Determines whether to copy or move. Allowed values: "copy", "move".
 * @returns         {Promise<AxiosResponse<T>>}
 */
async function performCopyOrMoveFile(srcFs, srcRemote, dstFs, dstRemote, Name, IsDir, mode) {
    let url = "";
    if (mode === "move") {
        if (IsDir) {
            url = "/sync/move";
        } else {
            url = "/operations/movefile";
        }
    } else {
        if (IsDir) {
            url = "/sync/copy";
        } else {
            url = "/operations/copyfile";
        }
    }

    if (isLocalRemoteName(srcFs)) {
        srcFs = "";
    }

    if (isLocalRemoteName(dstFs)) {
        dstFs = "";
    }

    if (IsDir) {

        const splitRes = srcRemote.split('/');

        const data = {
            srcFs: srcFs + srcRemote,
            dstFs: dstFs + dstRemote + "/" + splitRes[splitRes.length - 1],
            _async: true
        };
        console.log("DirOp:", data);
        return await axiosInstance.post(url, data);

    } else {
        if (dstRemote === "") {
            dstRemote = Name;
        } else {
            dstRemote += "/" + Name;
        }

        const data = {
            srcFs: srcFs,
            srcRemote: srcRemote,
            dstFs: dstFs,
            dstRemote: dstRemote,
            _async: true
        };
        return await axiosInstance.post(url, data);

    }
}

export default axiosInstance;
