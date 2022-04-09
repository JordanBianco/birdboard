import api from '@/apis/api'
import router from '@/router'

export const signup = async ({commit}, {user}) => {
    try {
        const res = await api.post('/signup', user);
        if (res.status === 201) {
            router.push({ name: 'signin' })
        }        
    } catch (error) {
        if (error.response.status === 422) {
            commit('SET_ERRORS', error.response.data.errors)
        }
    }
}

export const signin = async ({commit, dispatch}, {user}) => {
    try {
        const res = await api.post('/signin', user);
        if (res.status === 200) {
            commit('SET_LOGGED_IN_STATUS', true)
            commit('SET_USER', res.data.user)
            commit('SET_TOKEN', res.data.token)
            
            // prendo i likes dell'utente e li salvo in persisted.state 
            dispatch('like/getUserLikes', { username: res.data.user.username }, { root: true})

            // prendo i following dell'utente che si logga e li salvo in persisted.state per fare i check se seguo l'utente su cui sono (la pagina) o meno
            dispatch('follow/getLoggedInUserFollowing', { username: res.data.user.username }, { root: true })
            
            router.push({ name: 'user.show', params: { username : res.data.user.username }})
        }        
    } catch (error) {
        if (error.response.status === 422) {
            commit('SET_ERRORS', error.response.data.errors)
        }
    }
}

export const signout = async ({commit}) => {
    try {
        const res = await api.post('/signout');
        if (res.status === 200) {
            commit('SET_LOGGED_IN_STATUS', false)
            commit('SET_USER', null)
            commit('SET_TOKEN', null)

            commit('like/GET_USER_LIKES', [], { root: true})
            commit('follow/GET_LOGGED_IN_USER_FOLLOWING', [], { root: true})

            router.push({ name: 'home' })
        }        
    } catch (error) {
        console.log(error)
    }
}

export const getUser = async ({commit}) => {
    try {
        const res = await api.get('/user');
        if (res.status === 200) {
            commit('SET_USER', res.data)
        }        
    } catch (error) {
        console.log(error)
    }
}
