import axios from "axios";


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


export function performMoveFile(srcFs, srcRemote, dstFs, dstRemote, Name, IsDir) {
    return performCopyOrMoveFile(srcFs, srcRemote, dstFs, dstRemote, Name, IsDir, 'move');
}

export function performCopyFile(srcFs, srcRemote, dstFs, dstRemote, Name, IsDir) {

    return performCopyOrMoveFile(srcFs, srcRemote, dstFs, dstRemote, Name, IsDir, 'copy');
}

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
