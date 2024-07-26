import axios from 'axios'
import { Platform } from 'react-native';

const AxiosInstance = axios.create({
    baseURL: Platform.select({
        ios: 'http://localhost:3000',
        android: 'http://10.0.2.2:3000'
    }),
    timeout: 10000
})


AxiosInstance.interceptors.request.use(async function (config) {
    return config;
}, function (error) {
    return Promise.reject(error);
});
AxiosInstance.interceptors.response.use(function (response) {
    console.log("response.status", response.data)
    return response;
}, function (error) {
    console.log('Error code', error)
    return Promise.reject(error);
});

export default AxiosInstance