import api from '@/apis/api'

export const getAll = async ({commit}, {id}) => {
    try {
        const res = await api.get('/feed/' + id);
        if (res.status === 200) {
            commit('GET_ALL', res.data.data);  
        }        
    } catch (error) {
        console.log(error);
    }
}