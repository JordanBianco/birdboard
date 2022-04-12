import api from '@/apis/api'

export const getReplies = async ({commit}, {id, page}) => {
    try {
        const res = await api.get('/post/' + id + '/replies?page=' + page);
        if (res.status === 200) {
            commit('GET_REPLIES', res.data)
            commit('GET_LAST_PAGE', res.data.meta.last_page)
        }        
    } catch (error) {
        console.log(error)
    }
}

export const storeReply = async ({commit}, {post, reply}) => {
    try {
        const res = await api.post('/post/' + post.id + '/replies', reply);
        if (res.status === 201) {
            commit('STORE_REPLY', {
                reply: res.data.data,
                post: post
            });
            commit('SET_SUCCESS_STATUS', true);
            commit('SET_ERRORS', [])
        }
    } catch (error) {
        if (error.response.status === 422) {
            commit('SET_ERRORS', error.response.data.errors)
        }
    }
}

export const updateReply = async ({commit}, {id, reply}) => {
    try {
        const res = await api.patch('/post/' + id + '/replies/' + reply.id, reply);
        if (res.status === 200) {
            commit('SET_EDIT_SUCCESS_STATUS', true);
        }
    } catch (error) {
        if (error.response.status === 422) {
            commit('SET_ERRORS', error.response.data.errors)
        }
    }
}

export const deleteReply = async ({commit}, {post, reply}) => {
    try {
        const res = await api.delete('/post/' + post.id + '/replies/' + reply.id);
        if (res.status === 200) {
            commit('DELETE_REPLY', {
                post: post,
                reply: reply
            });
        }
    } catch (error) {
        console.log(error)
    }
}