import axios from 'axios'

const AxiosInstance = axios.create({
    baseURL: 'http://localhost:3000',
    timeout: 10000
})

AxiosInstance.interceptors.response.use(function (response) {
    try {
        var data = JSON.parse(response.data[0].result)
    } catch (error) {
        
    }
    return data
}, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    console.log('Error code', error)
    return Promise.reject(error);
});

export default AxiosInstance