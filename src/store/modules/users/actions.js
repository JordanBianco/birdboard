import api from '@/apis/api'
import router from '@/router'

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

export const getPosts = async ({commit}, {username, page}) => {
    try {
        const res = await api.get('/user/' + username + '/posts?page=' + page);
        if (res.status === 200) {
            commit('GET_POSTS', res.data)
            commit('GET_LAST_PAGE', res.data.meta.last_page)
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

export const storePost = async ({commit}, {username, post, route}) => {
    try {
        const res = await api.post('/user/' + username + '/posts', post);
        if (res.status === 201) {
            switch (route) {
                case 'home':
                    commit('feed/STORE_POST', res.data.data, { root: true })
                    break;
                case 'user.show':    
                    commit('STORE_POST', res.data.data);
                    break;
            }
            commit('SET_SUCCESS_STATUS', true);
            commit('SET_ERRORS', [])
        }
    } catch (error) {
        if (error.response.status === 422) {
            commit('SET_ERRORS', error.response.data.errors)
        }
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

export const deletePost = async ({commit}, {username, post, route}) => {
    try {
        const res = await api.delete('/user/' + username + '/posts/' + post.id);
        if (res.status === 200) {
            switch (route) {
                case 'user.show':
                    commit('DELETE_POST', post);
                    break;
                case 'home':
                    commit('feed/DELETE_POST_FROM_FEED', post, { root: true});
                    break;
                case 'post.show':
                    router.push({ name: 'user.show', params: { username: username }})
                    break;  
            }
        }
    } catch (error) {
        console.log(error)
    }
}

export const searchUser = async ({commit}, {search}) => {
    try {
        const res = await api.get('/users?search=' + search);
        if (res.status === 200) {
            commit('SEARCH_RESULTS', res.data.data);
        }
    } catch (error) {
        console.log(error)
    }
}

