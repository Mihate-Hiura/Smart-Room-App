import axiosClient from "./axiosClient";

const humidAPI = {
    getAll(params){
        const url = '/humid';
        return axiosClient.get(url, {params});
    },
    get(id){
        const url = `/humid/${id}`;
        return axiosClient.get(url);
    },

    add(data){
        const url = '/humid/data';
        return axiosClient.post(url, data)
    },

    update(data){
        const url = `/humid/${data.id}`;
        return axiosClient.patch(url,data);
    },

    remove(id){
        const url = `/humid/${id}`;
        return axiosClient.delete(url);
    }
};

export default humidAPI;