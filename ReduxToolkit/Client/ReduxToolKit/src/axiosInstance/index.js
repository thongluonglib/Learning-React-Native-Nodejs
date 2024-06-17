import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'localhost:3000',
});



export default axiosInstance;