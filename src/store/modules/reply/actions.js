import api from '@/apis/api'

export const getReplies = async ({commit}, {id}) => {
    commit('GET_REPLIES', null)
    try {
        const res = await api.get('/post/' + id + '/replies');
        if (res.status === 200) {
            commit('GET_REPLIES', res.data.data)
        }        
    } catch (error) {
        console.log(error)
    }
}

export const storeReply = async ({commit}, {post, reply}) => {
    try {
        const res = await api.post('/post/' + post.id + '/replies', reply);
        if (res.status === 201) {
            commit('STORE_REPLY', res.data.data);
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

export const deleteReply = async ({commit}, {id, reply}) => {
    try {
        const res = await api.delete('/post/' + id + '/replies/' + reply.id);
        if (res.status === 200) {
            commit('DELETE_REPLY', reply);
        }
    } catch (error) {
        console.log(error)
    }
}