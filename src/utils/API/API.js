import axios from "axios";
import {isLocalRemoteName} from "../Tools";
import {IP_ADDRESS_KEY, PASSWORD_KEY, USER_NAME_KEY} from "../Constants";
import urls from "./endpoint";

/**
 * Global level axios configuration. These settings are automatically used in other places by using an axiosInstance instead of axios directly
 */
let axiosInstance = axios.create({
    headers: {'Content-Type': 'application/json'},
    responseType: "json"
});

/**
 * Interceptor adds basic authentication to every axios request.
 */
axiosInstance.interceptors.request.use(
    config => {
        config.baseURL = localStorage.getItem(IP_ADDRESS_KEY);
        config.headers.Authorization = 'Basic ' + btoa(localStorage.getItem(USER_NAME_KEY) + ":" + localStorage.getItem(PASSWORD_KEY));
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
            url = urls.moveDir;
        } else {
            url = urls.moveFile;
        }
    } else {
        if (IsDir) {
            url = urls.copyDir;
        } else {
            url = urls.copyFile;
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
