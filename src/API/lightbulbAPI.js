import axiosClient from "./axiosClient";

const lightbulbAPI = {
    getAll(params){
        const url = '/lightbulb';
        return axiosClient.get(url, {params});
    },
    get(id){
        const url = `/lightbulb/${id}`;
        return axiosClient.get(url);
    },

    add(data){
        const url = '/lightbulb/data';
        return axiosClient.post(url, data)
    },

    update(data){
        const url = `/lightbulb/${data.id}`;
        return axiosClient.patch(url,data);
    },

    remove(id){
        const url = `/lightbulb/${id}`;
        return axiosClient.delete(url);
    }
};

export default lightbulbAPI;