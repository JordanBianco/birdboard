import api from '@/apis/api'

export const getLoggedInUserFollowing = async ({commit}, {username}) => {
    try {
        const res = await api.get('/user/' + username + '/following')
        if (res.status === 200) {
            commit('GET_LOGGED_IN_USER_FOLLOWING', res.data.data)
        }
    } catch (error) {
        console.log(error)
    }
}

export const getUserFollowers = async ({commit}, {username}) => {
    commit('GET_USER_FOLLOWERS', null)
    try {
        const res = await api.get('/user/' + username + '/followers')
        if (res.status === 200) {
            commit('GET_USER_FOLLOWERS', res.data.data)
        }
    } catch (error) {
        console.log(error)
    }
}

export const getUserFollowing = async ({commit}, {username}) => {
    commit('GET_USER_FOLLOWING', null)
    try {
        const res = await api.get('/user/' + username + '/following')
        if (res.status === 200) {
            commit('GET_USER_FOLLOWING', res.data.data)
        }
    } catch (error) {
        console.log(error)
    }
}

export const addFollowing = async ({commit}, {user, loggedInUser}) => {
    try {
        const res = await api.post('/user/' + user.id + '/follow')
        if (res.status === 200) {
            // Aggiungo l'utente da seguire alla lista following dell'utente attualmente loggato
            // E aggiungo l'utente loggato alla lista dei seguiti dell'utente appena seguito
            commit('ADD_FOLLOWING', {user, loggedInUser})
        }
    } catch (error) {
        console.log(error)
    }
}

export const removeFollowing = async ({commit}, {followed, user, value}) => {
    try {
        const res = await api.delete('/user/' + followed.id + '/unfollow')
        if (res.status === 200) {
            commit('REMOVE_FOLLOWING', {followed, user, value})
        }
    } catch (error) {
        console.log(error)
    }
}

export const removeFollower = async ({commit}, {follower, user}) => {
    try {
        const res = await api.delete('/user/' + follower.id + '/remove-follower')
        if (res.status === 200) {
            commit('REMOVE_FOLLOWER', {follower, user})
        }
    } catch (error) {
        console.log(error)
    }
}