import api from '@/apis/api'

export const getAll = async ({commit}) => {
    try {
        const res = await api.get('posts');
        if (res.status === 200) {
            commit('GET_ALL', res.data.data);  
        }        
    } catch (error) {
        console.log(error);
    }
}

export const get = async ({commit}, {id}) => {
    try {
        const res = await api.get('posts/' + id);
        if (res.status === 200) {
            commit('GET', res.data.data);  
        }        
    } catch (error) {
        console.log(error);
    }
}