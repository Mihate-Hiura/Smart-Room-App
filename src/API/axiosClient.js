import axios from 'axios';

const adafruitKey = import.meta.env.VITE_ADAFRUIT_KEY;
const axiosClient = axios.create({
    baseURL: 'https://io.adafruit.com/api/v2/KentLe2252370/feeds/',
    headers:{
        'X-AIO-Key': adafruitKey
    }
}); 
axiosClient.interceptors.request.use(function (config) {
    // Do something before request is sent
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });

// Add a response interceptor
axiosClient.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data.last_value;
  }, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  });
export default axiosClient;