import axiosClient from "./axiosClient";

const doorAPI = {
    getAll(params){
        const url = '/door';
        return axiosClient.get(url, {params});
    },
    get(id){
        const url = `/door/${id}`;
        return axiosClient.get(url);
    },

    add(data){
        const url = '/door/data';
        return axiosClient.post(url,data)
    },

    update(data){
        const url = `/door/${data.id}`;
        return axiosClient.update(url,data);
    },

    remove(id){
        const url = `/door/${id}`;
        return axiosClient.delete(url);
    }
};

export default doorAPI;