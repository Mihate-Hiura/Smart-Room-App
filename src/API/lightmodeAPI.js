import axiosClient from "./axiosClient";

const lightmodeAPI = {
    getAll(params){
        const url = '/lightmode';
        return axiosClient.get(url, {params});
    },
    get(id){
        const url = `/lightmode/${id}`;
        return axiosClient.get(url);
    },

    add(data){
        const url = '/lightmode/data';
        return axiosClient.post(url, data)
    },

    update(data){
        const url = `/lightmode/${data.id}`;
        return axiosClient.patch(url,data);
    },

    remove(id){
        const url = `/lightmode/${id}`;
        return axiosClient.delete(url);
    }
};

export default lightmodeAPI;