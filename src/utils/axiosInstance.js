
import axios from 'axios';
const API_URL = process.env.MY_REVIEW_SERVER;
const axiosInstance = axios.create({
    baseURL: API_URL,
    timeout: 5000,
    headers: {
        "Content-Type": "application/json",
        accept: "application/json",
        token: ''
    },
});


axiosInstance.interceptors.request.use(async function (config) {
    config.headers.token =  await SInfo.getItem('token', {
        sharedPreferencesName: 'myReviewTokenPreferences',
        keychainService:'myReview'
    })
    return config;
}, function (error) {
    console.log(error);
    return Promise.reject(error);
});


export default axiosInstance;