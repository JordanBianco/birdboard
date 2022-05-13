import api from '@/apis/api'

export const sendFollowRequest = async ({commit}, {following, loggedInUser}) => {
    try {
        const res = await api.post('/user/' + loggedInUser.id + '/follow-request', {
            following: following
        })
        if (res.status === 200) {
            commit('SET_FOLLOW_REQUEST_STATUS', 'pending')
        }
    } catch (error) {
        console.log(error)
    }
}

export const getReceivedFollowRequests = async ({commit}, {user, page}) => {
    try {
        const res = await api.get('/user/' + user.id + '/received-follow-request?page=' + page)
        if (res.status === 200) {
            commit('GET_RECEIVED_FOLLOW_REQUESTS', res.data.data)
            commit('GET_RECEIVED_LAST_PAGE', res.data.meta.last_page)
            commit('GET_RECEIVED_TOTAL', res.data.meta.total)
        }
    } catch (error) {
        console.log(error)
    }
}

export const getSentFollowRequests = async ({commit}, {user, page}) => {
    try {
        const res = await api.get('/user/' + user.id + '/sent-follow-request?page=' + page)
        if (res.status === 200) {
            commit('GET_SENT_FOLLOW_REQUESTS', res.data.data)
            commit('GET_SENT_LAST_PAGE', res.data.meta.last_page)
            commit('GET_SENT_TOTAL', res.data.meta.total)
        }
    } catch (error) {
        console.log(error)
    }
}

export const acceptRequest = async ({commit}, {user, follower, status}) => {
    try {
        const res = await api.patch('/user/' + user.id + '/follow-request', {
            follower_id: follower.id,
            status: status
        })
        if (res.status === 200) {
            commit('REMOVE_FOLLOW_REQUEST_FROM_RECEIVED', follower)
        }
    } catch (error) {
        console.log(error)
    }
}


export const declineRequest = async ({commit}, {user, follower, status}) => {
    try {
        const res = await api.patch('/user/' + user.id + '/follow-request', {
            follower_id: follower.id,
            status: status
        })
        if (res.status === 200) {
            commit('REMOVE_FOLLOW_REQUEST_FROM_RECEIVED', follower)
        }
    } catch (error) {
        console.log(error)
    }
}

export const cancelRequest = async ({commit}, {user, following, route_name}) => {
    try {
        const res = await api.delete('/user/' + user.id + '/follow-request', { params: {
            following_id: following.id,
        }})
        
        if (res.status === 200) {
            /** Se provengo dalla pagina dell'utente devo solo settare lo stato della richiesta come null */
            if (route_name === 'user.show') {
                commit('SET_FOLLOW_REQUEST_STATUS', 'null')                
            } else {
                /** Altrimenti rimuovo la richiesta (dalla pagina request.index) */
                commit('REMOVE_FOLLOW_REQUEST_FROM_SENT', following)
            }
        }
    } catch (error) {
        console.log(error)
    }
}

export const checkRequestStatus = async ({commit}, {loggedInUser, user}) => {
    try {
        const res = await api.get('/user/' + loggedInUser.id + '/status-follow-request', { params: {
            user_id: user.id
        }})
        if (res.status === 200) {
            commit('SET_FOLLOW_REQUEST_STATUS', res.data)
        }
    } catch (error) {
        console.log(error)
    }
}