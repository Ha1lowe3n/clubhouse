import axios from "axios";

export const Axios = axios.create({
    baseURL: "http://localhost:7000",
    withCredentials: true,
});
