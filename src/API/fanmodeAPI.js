import axiosClient from "./axiosClient";

const fanmodeAPI = {
    getAll(params){
        const url = '/fanmode';
        return axiosClient.get(url, {params});
    },
    get(id){
        const url = `/fanmode/${id}`;
        return axiosClient.get(url);
    },

    add(data){
        const url = '/fanmode/data';
        return axiosClient.post(url, data)
    },

    update(data){
        const url = `/fanmode/${data.id}`;
        return axiosClient.patch(url,data);
    },

    remove(id){
        const url = `/fanmode/${id}`;
        return axiosClient.delete(url);
    }
};

export default fanmodeAPI;