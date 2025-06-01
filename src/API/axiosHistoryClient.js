// src/API/axiosHistoryClient.js
import axios from "axios";

const adafruitKey = import.meta.env.VITE_ADAFRUIT_KEY;

const axiosHistoryClient = axios.create({
  baseURL: "https://io.adafruit.com/api/v2/KentLe2252370/feeds/",
  headers: {
    "X-AIO-Key": adafruitKey,
  },
});

// Don't add response interceptor that extracts last_value
// Just return the full data
axiosHistoryClient.interceptors.response.use(
  function (response) {
    return response.data;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default axiosHistoryClient;
