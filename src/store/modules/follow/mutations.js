/** Followers */
export const GET_USER_FOLLOWERS = (state, followers) => {
    state.followers.push(...followers.data)
}

// Rimuovo l'utente dalla lista dei followers dell'utente loggato e diminuisco il numero di 1
export const REMOVE_FOLLOWER = (state, {follower, user}) => {
    let followerInList

    followerInList = state.followers.find(f => {
        return f.id === follower.id
    })

    state.followers.splice(state.followers.indexOf(followerInList), 1)
    user.followers_count = user.followers_count - 1
}

export const EMPTY_FOLLOWERS = (state) => {
    state.followers = []
    state.lastPage = null
}

/** Following */
export const GET_USER_FOLLOWING = (state, following) => {
    state.following.push(...following.data)
}

export const REMOVE_FOLLOWING = (state, {following, user}) => {
    let followingInList

    followingInList = state.following.find(f => {
        return f.id === following.id
    })

    state.following.splice(state.following.indexOf(followingInList), 1)

    following.followers_count = following.followers_count - 1
    user.following_count = user.following_count - 1
}

export const EMPTY_FOLLOWING = (state) => {
    state.following = []
    state.lastPage = null
}

export const GET_LAST_PAGE = (state, lastPage) => {
    state.lastPage = lastPage
}