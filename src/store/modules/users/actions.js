import api from '@/apis/api'

export const getUser = async ({commit}, {username}) => {
    commit('GET_USER', null)
    try {
        const res = await api.get('/user/' + username);
        if (res.status === 200) {
            commit('GET_USER', res.data.data)
        }        
    } catch (error) {
        console.log(error)
    }
}

export const getPosts = async ({commit}, {username}) => {
    commit('GET_POSTS', null)
    try {
        const res = await api.get('/user/' + username + '/posts');
        if (res.status === 200) {
            commit('GET_POSTS', res.data.data)
        }        
    } catch (error) {
        console.log(error)
    }
}

export const getPost = async ({commit}, {username, id}) => {
    commit('GET_POST', null)
    try {
        const res = await api.get('/user/' + username + '/posts/' + id);
        if (res.status === 200) {
            commit('GET_POST', res.data.data)
        }        
    } catch (error) {
        console.log(error)
    }
}

export const storePost = async ({commit}, {username, post}) => {
    try {
        const res = await api.post('/user/' + username + '/posts', post);
        if (res.status === 201) {
            commit('STORE_POST', res.data.data);
            commit('SET_SUCCESS_STATUS', true);
        }
    } catch (error) {
        console.log(error)
    }
}

export const updatePost = async ({commit}, {username, post}) => {
    try {
        const res = await api.patch('/user/' + username + '/posts/' + post.id, post);
        if (res.status === 200) {
            commit('SET_EDIT_SUCCESS_STATUS', true);
        }
    } catch (error) {
        if (error.response.status === 422) {
            commit('SET_ERRORS', error.response.data.errors)
        }
    }
}

export const deletePost = async ({commit}, {username, post}) => {
    try {
        const res = await api.delete('/user/' + username + '/posts/' + post.id);
        if (res.status === 200) {
            commit('DELETE_POST', post);
        }
    } catch (error) {
        console.log(error)
    }
}