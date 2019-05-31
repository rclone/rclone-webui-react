import axios from "axios";

let axiosInstance = axios.create({
    baseURL: "localhost:5572/",
    responseType: "json"
});

export default axiosInstance;
