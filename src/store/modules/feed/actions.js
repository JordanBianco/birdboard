import api from '@/apis/api'

export const getFeedPosts = async ({commit}, {id, page}) => {
    try {
        const res = await api.get('/feed/' + id + '?page=' + page);
        if (res.status === 200) {
            commit('GET_FEED_POSTS', res.data);  
            commit('GET_LAST_PAGE', res.data.meta.last_page);  
        }        
    } catch (error) {
        console.log(error);
    }
}