import api from '@/apis/api'

export const getLoggedInUserFollowers = async ({commit}, {username}) => {
    try {
        const res = await api.get('/user/' + username + '/followers')
        if (res.status === 200) {
            commit('GET_LOGGED_IN_USER_FOLLOWERS', res.data.data)
        }
    } catch (error) {
        console.log(error)
    }
}

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

export const removeFollowing = async ({commit}, {user, loggedInUser}) => {
    try {
        const res = await api.delete('/user/' + user.id + '/unfollow')
        if (res.status === 200) {
            // Rimuovo l'utente dalla lista following dell'utente attualmente loggato
            // E rimuovo l'utente loggato dalla lista dei follower dell'utente appena seguito
            commit('REMOVE_FOLLOWING', {user, loggedInUser})
        }
    } catch (error) {
        console.log(error)
    }
}

export const removeFollower = async ({commit}, {user, loggedInUser}) => {
    try {
        const res = await api.delete('/user/' + user.id + '/remove-follower')
        if (res.status === 200) {
            // Rimuovo l'utente dalla lista follower dell'utente attualmente loggato
            commit('REMOVE_FOLLOWER', {user, loggedInUser})
        }
    } catch (error) {
        console.log(error)
    }
}