import api from '@/apis/api'
import router from '@/router';

export const getPosts = async ({commit}) => {
    try {
        const res = await api.get('user/posts');
        if (res.status === 200) {
            commit('GET_POSTS', res.data.data);  
        }        
    } catch (error) {
        console.log(error);
    }
}

export const storePost = async ({commit}, {post}) => {
    try {
        const res = await api.post('posts', post)
        if (res.status === 201) {
            commit('STORE_POST', res.data.data);
            commit('SET_SUCCESS_STATUS', true);
        }
    } catch (error) {
        console.log(error)
    }
}

export const updatePost = async ({commit}, {post}) => {
    try {
        const res = await api.patch('posts/' + post.id, post)
        if (res.status === 200) {
            router.push({ name: 'post.show', params: { id: post.id }})
        }
    } catch (error) {
        console.log(error)
    }
}

export const deletePost = async ({commit}, {post}) => {
    try {
        const res = await api.delete('posts/' + post.id)
        if (res.status === 200) {
            commit('DELETE_POST', post);
        }
    } catch (error) {
        console.log(error)
    }
}