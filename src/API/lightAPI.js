import axiosClient from "./axiosClient";

const lightAPI = {
    getAll(params){
        const url = '/light';
        return axiosClient.get(url, {params});
    },
    get(id){
        const url = `/light/${id}`;
        return axiosClient.get(url);
    },

    add(data){
        const url = '/light/data';
        return axiosClient.post(url, data)
    },

    update(data){
        const url = `/light/${data.id}`;
        return axiosClient.patch(url,data);
    },

    remove(id){
        const url = `/light/${id}`;
        return axiosClient.delete(url);
    }
};

export default lightAPI;