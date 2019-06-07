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
        url = "operations/movefile";
    } else {
        url = "/operations/copyfile";
    }
    if (IsDir) {
        // if (dstRemote === "") {
        //     dstRemote = Name;
        // } else {
        //     dstRemote += "/" + Name;
        // }
        // const data = {
        //     srcFs: srcFs + srcRemote,
        //     dstFs: dstFs + dstRemote
        // };

        // let res = await axiosInstance.post("/operations/copy")
        // let res = await axiosInstance.post("/sync/copy", data);
        // console.log("Dir copy Res", res);
        // this.setState({isOperationInProgress: false})
        console.log("Copying directory feature is not yet implemented");

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
        let res = await axiosInstance.post(url, data);
        console.log("Res", res);

    }
}

export default axiosInstance;
