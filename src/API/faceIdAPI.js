import axiosClient from "./axiosClient";

const faceIdAPI = {
    getAll(params){
        const url = '/faceid';
        return axiosClient.get(url, {params});
    },
    get(id){
        const url = `/faceid/${id}`;
        return axiosClient.get(url);
    },

    add(data){
        const url = '/faceid/data';
        return axiosClient.post(url, data)
    },

    update(data){
        const url = `/faceid/${data.id}`;
        return axiosClient.patch(url,data);
    },

    remove(id){
        const url = `/faceid/${id}`;
        return axiosClient.delete(url);
    }
};

export default faceIdAPI;