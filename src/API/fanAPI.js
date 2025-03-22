import axiosClient from "./axiosClient";

const fanAPI = {
    getAll(params){
        const url = '/fan';
        return axiosClient.get(url, {params});
    },
    get(id){
        const url = `/fan/${id}`;
        return axiosClient.get(url);
    },

    add(data){
        const url = '/fan/data';
        return axiosClient.post(url, data)
    },

    update(data){
        const url = `/fan/${data.id}`;
        return axiosClient.patch(url,data);
    },

    remove(id){
        const url = `/fan/${id}`;
        return axiosClient.delete(url);
    }
};

export default fanAPI;