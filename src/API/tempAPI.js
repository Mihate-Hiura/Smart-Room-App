import axiosClient from "./axiosClient";

const tempAPI = {
    getAll(params){
        const url = '/temp';
        return axiosClient.get(url, {params});
    },
    get(id){
        const url = `/temp/${id}`;
        return axiosClient.get(url);
    },

    add(data){
        const url = '/temp/data';
        return axiosClient.post(url, data)
    },

    update(data){
        const url = `/temp/${data.id}`;
        return axiosClient.patch(url,data);
    },

    remove(id){
        const url = `/temp/${id}`;
        return axiosClient.delete(url);
    }
};

export default tempAPI;