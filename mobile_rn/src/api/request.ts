import axios, { InternalAxiosRequestConfig } from "axios"

axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8'

const baseUrl: string = "http://10.0.2.2:3000";

let request = axios.create({
    baseURL: baseUrl,
    timeout: 5000
});

request.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        if (config.headers.isToken) {
            if (!config.headers.token) throw new Error('User not uthenticated');
            config.headers['Authentication'] = 'Bearer ' + config.headers.token;
        }
        return config;
    },
    err => {
        console.log(err);
        Promise.reject(err);
    }
);

request.interceptors.response.use(
    res => {
        return res;
    },
    err => {
        return Promise.reject(err);
    }
);

export default request;