import axiosClient from "./axiosClient";

const fanServerAPI = {
    getAll(params){
        const url = '/fanserver';
        return axiosClient.get(url, {params});
    },
    get(id){
        const url = `/fanserver/${id}`;
        return axiosClient.get(url);
    },

    add(data){
        const url = '/fanserver/data';
        return axiosClient.post(url, data)
    },

    update(data){
        const url = `/fanserver/${data.id}`;
        return axiosClient.patch(url,data);
    },

    remove(id){
        const url = `/fanserver/${id}`;
        return axiosClient.delete(url);
    }
};

export default fanServerAPI;