import axios from 'axios'
import { storage } from '../mmkv';
import { useContext } from 'react';
import { AuthContext } from '../context';

const AxiosInstance = axios.create({
    baseURL: 'http://localhost:3000',
    timeout: 10000
})

AxiosInstance.interceptors.request.use(async function (config) {
    console.tron.log(config)
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});
AxiosInstance.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    console.tron.log(response)
    
    return response;
}, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    console.log('Error code', error)
    return Promise.reject(error);
});

export default AxiosInstance