import axios from "axios";
import './Global'

let axiosInstance = axios.create({
    baseURL: global.ipAddress,
    headers: {'Content-Type': 'application/json'},
    responseType: "json"
});

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

        // if(dstRemote === ""){
        //     dstRemote += srcRemote
        // }else{
        //     dstRemote += "/" + srcRemote;
        // }

        const splitRes = srcRemote.split('/');

        const data = {
            srcFs: srcFs + srcRemote,
            dstFs: dstFs + dstRemote + "/" + splitRes[splitRes.length - 1]
        };

        console.log("dirop:", data);

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
            dstRemote: dstRemote
        };
        return await axiosInstance.post(url, data);

    }
}

export default axiosInstance;
