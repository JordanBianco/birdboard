import api from '@/apis/api'
import router from '@/router'

export const updateProfileInfo = async ({commit}, {id, name, bio}) => {
    try {
        const res = await api.patch('/user/' + id + '/profile', {
            name: name,
            bio: bio
        });
        if (res.status === 200) {
            commit('auth/UPDATE_USER', res.data, { root: true })
            commit('SET_ERRORS', [])
            commit('SET_SUCCESS_STATUS', true)
        }        
    } catch (error) {
        if (error.response.status === 422) {
            commit('SET_ERRORS', error.response.data.errors)
        }
    }
}

export const updateAccountInfo = async ({commit}, {id, username}) => {
    try {
        const res = await api.patch('/user/' + id + '/account', {
            username: username
        });
        if (res.status === 200) {
            router.push({ name: 'user.settings.account', params: { username: res.data.username }})
            commit('SET_ERRORS', [])
            commit('SET_SUCCESS_STATUS', true)
            commit('auth/UPDATE_USER', res.data, { root: true })
        }        
    } catch (error) {
        if (error.response.status === 422) {
            commit('SET_ERRORS', error.response.data.errors)
        }
    }
}

export const updateImage = async ({commit}, formData) => {
    try {
        const res = await api.post('/user/' + formData.get('id') + '/image', formData);
        if (res.status === 200) {
            commit('auth/UPDATE_USER', res.data, { root: true })
            commit('SET_ERRORS', [])
            commit('SET_SUCCESS_STATUS', true)
        }
    } catch (error) {
        if (error.response.status === 422) {
            commit('SET_ERRORS', error.response.data.errors)
        }
    }
}

export const updatePassword = async ({commit}, {id, form}) => {
    try {
        const res = await api.patch('/user/' + id + '/password', {
            current_password: form.current_password,
            new_password: form.new_password,
            new_password_confirmation: form.new_password_confirmation
        });
        if (res.status === 200) {
            commit('SET_ERRORS', [])
            commit('SET_SUCCESS_STATUS', true)
        }
    } catch (error) {
        if (error.response.status === 422) {
            commit('SET_ERRORS', error.response.data.errors)
        }
    }
}

export const deleteAccount = async ({commit}, {id}) => {
    try {
        const res = await api.delete('/user/' + id + '/account');
        if (res.status === 200) {
            commit('auth/SET_LOGGED_IN_STATUS', false, { root: true })
            commit('auth/SET_USER', null, { root: true })
            commit('auth/SET_TOKEN', null, { root: true })

            commit('like/GET_USER_LIKES', [], { root: true})
            commit('follow/GET_LOGGED_IN_USER_FOLLOWING', [], { root: true})

            router.push({ name: 'signin' })
        }        
    } catch (error) {
        console.log(error)
    }
}