import axios from "axios";
import './Global'

let axiosInstance = axios.create({
    baseURL: global.ipAddress,
    headers: {'Content-Type': 'application/json'},
    responseType: "json"
});

export default axiosInstance;
