import axios, { AxiosRequestConfig } from 'axios';
import { Platform } from 'react-native';
import Config from 'react-native-config';
import { SecureStore } from '../secure-store';
import { TokenObject } from '@src/types/api/login/token';
import has from 'lodash/has';
const axiosInstance = axios.create({
    baseURL: Platform.select({
        ios: Config.API_URL,
        android: 'http://10.0.2.2:3005',
    }),
    withCredentials: true,
    timeout: 300000,
    headers: {
        'Content-Type': 'application/json',
    },
});

axiosInstance.interceptors.request.use(async (config) => {
    const userLocalStorage = await SecureStore.getStorage<TokenObject>();
    if (has(userLocalStorage, 'password.accessToken')) {
        config.headers.Authorization = `Bearer ${userLocalStorage.password.accessToken}`;
    }

    return config;
}, (error) => {
    return Promise.reject(error);
});

export function setResponseAxios(setAuth) {
    axiosInstance.interceptors.response.use(function (response) {
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        return response;
    }, async function (error) {
        // const originalRequest = error.config;
        // if (error.response.status === 401 && !originalRequest._retry) {
        //     originalRequest._retry = true;
        //     const userLocalStorage = await SecureStore.getStorage<TokenObject>();
        //     let refreshToken = null;
        //     if (get(userLocalStorage, 'password.accessToken')) {
        //         refreshToken = userLocalStorage.password.refreshToken;
        //     }
        //     if (refreshToken) {
        //         try {
        //             const response = await fetcher(ApiKey.REFRESH_TOKEN, {
        //                 data: {
        //                     refreshToken,
        //                 },
        //                 method: 'post',
        //             });
        //             // don't use axious instance that already configured for refresh token api call
        //             const newAccessToken = response.data.accessToken;
        //             localStorage.setItem('accessToken', newAccessToken);  //set new access token
        //             originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        //             return axios(originalRequest); //recall Api with new token
        //         } catch (error) {
        //             // Handle token refresh failure
        //             // mostly logout the user and re-authenticate by login again
        //         }
        //     }
        // }
        return Promise.reject(error);
    });
}

const fetcher = async function <T>(url: string, configs: AxiosRequestConfig = {}, next?: (error?: Error | null, data?: T) => void): Promise<T> {
    try {
        const options = !configs.method || configs.method === 'get' ? {
            ...configs,
            url,
            // url: queryString.stringifyUrl({ url, query: { ...configs.data } }, { encode: true, skipEmptyString: true, skipNull: true }),
            method: 'get',
        } : {
            ...configs,
            url,
        };
        const response = await axiosInstance(options);

        if (response.status === 204 || response.statusText === 'No Content') {
            next?.(null, {} as T);
            return {} as T;
        }

        if (response.status !== 200 && response.status !== 201) {
            throw response;
        }

        const { data: resData = {} } = response;
        next?.(null, resData);
        return resData;
    } catch (error) {
        next?.(error as Error);
        throw error;
    }
};
export { axiosInstance as fetchApi, fetcher };
