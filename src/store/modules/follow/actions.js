import api from '@/apis/api'

/** Following */
export const getUserFollowing = async ({commit}, {id, page}) => {
    try {
        const res = await api.get('/user/' + id + '/following?page=' + page)
        if (res.status === 200) {
            commit('GET_USER_FOLLOWING', res.data)
            commit('GET_LAST_PAGE', res.data.meta.last_page)
        }
    } catch (error) {
        console.log(error)
    }
}

export const removeFollowing = async ({commit}, {following, user}) => {
    try {
        const res = await api.delete('/user/' + user.id + '/unfollow', { params: {
            following_id: following.id
        }})
        if (res.status === 200) {
            commit('REMOVE_FOLLOWING', {following, user})
            commit('followRequest/SET_FOLLOW_REQUEST_STATUS', 'null', { root: true })
        }
    } catch (error) {
        console.log(error)
    }
}

/** Followers */
export const getUserFollowers = async ({commit}, {id, page}) => {
    try {
        const res = await api.get('/user/' + id + '/followers?page=' + page)
        if (res.status === 200) {
            commit('GET_USER_FOLLOWERS', res.data)
            commit('GET_LAST_PAGE', res.data.meta.last_page)
        }
    } catch (error) {
        console.log(error)
    }
}

export const removeFollower = async ({commit}, {follower, user}) => {
    try {
        const res = await api.delete('/user/' + user.id + '/remove-follower', { params: {
            follower: follower.id
        }})
        if (res.status === 200) {
            commit('REMOVE_FOLLOWER', {follower, user})
        }
    } catch (error) {
        console.log(error)
    }
}