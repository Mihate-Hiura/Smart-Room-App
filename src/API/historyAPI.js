import axiosHistoryClient from "./axiosHistoryClient";

const historyAPI = {
  getFeedHistory(feedKey, params) {
    const url = `/${feedKey}/data`;
    return axiosHistoryClient.get(url, { params });
  },
};

export default historyAPI;
