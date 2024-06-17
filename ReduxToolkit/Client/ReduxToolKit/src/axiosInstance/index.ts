import axios from 'axios'

const AxiosInstance = axios.create({
    baseURL: 'http://localhost:3000',
    timeout: 10000
})

export function setClientToken() {
    // Add a request interceptor
    AxiosInstance.interceptors.request.use(async function (config) {
        // TODO
        return config;
    }, function (error) {
        // Do something with request error
        return Promise.reject(error);
    });
}
export function setResponseAxios() {
    AxiosInstance.interceptors.response.use(function (response) {
        // TODO
        return response;
    }, function (error) {
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error
        console.log('Error code', error)
        return Promise.reject(error);
    });
}

export default AxiosInstance