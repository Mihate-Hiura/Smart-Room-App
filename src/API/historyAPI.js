import axiosHistoryClient from "./axiosHistoryClient";

const historyAPI = {
  getFeedHistory(feedKey, params=null) {
    const url = `/${feedKey}/data`;
    return axiosHistoryClient.get(url, { params });
  },
};

export default historyAPI;
