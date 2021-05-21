import axios from 'axios'

export const Axios = axios.create({
    timeout: 10000,
})

// Add a response interceptor
Axios.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
}, function (error) {
    if(error.response.status === 401) {
        location.href = '/login'
    }
    return Promise.reject(error);
});

export default {
    install(Vue) {
        Object.defineProperty(Vue.prototype, '$http', { value: Axios })
    }
}

