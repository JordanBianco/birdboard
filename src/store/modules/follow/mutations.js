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
export const GET_LOGGED_IN_USER_FOLLOWING = (state, loggedInUserFollowing) => {
    state.loggedInUserFollowing = loggedInUserFollowing
}

export const GET_USER_FOLLOWING = (state, following) => {
    state.following.push(...following.data)
}

export const REMOVE_FOLLOWING = (state, {following, user, value}) => {
    // Rimuovo l'utente sia dalla lista dei following (che mostro nella dashboard)
    let followingInList
    followingInList = state.following.find(f => {
        return f.id === following.id
    })
    state.following.splice(state.following.indexOf(followingInList), 1)

    // sia dalla lista dei following salvata nel persisted.state
    let followingInPersisted
    followingInPersisted = state.loggedInUserFollowing.find(f => {
        return f.id === following.id
    })
    state.loggedInUserFollowing.splice(state.loggedInUserFollowing.indexOf(followingInPersisted), 1)
    
    // DIPENDE DA DOVE SI ARRIVA
    if (value === false) {
        // SE DAL PROFILO DELL'UTENTE CHE SMETTO DI SEGUIRE, DIMINUISCO IL NUMERO DEI FOLLOWER DI 1
        following.followers_count = following.followers_count - 1
    } else {
        // SE DAL PROFILO PERSONALE, DIMINUISCO IL NUMERO DEI SEGUITI (FOLLOWING ) DI 1
        // E RIMUOVO L'UTENTE CHE NON SEGUO PIU DALLA LISTA DEL PERSISTED.STATE
        user.following_count = user.following_count - 1
    }
}

export const EMPTY_FOLLOWING = (state) => {
    state.following = []
    state.lastPage = null
}


export const GET_LAST_PAGE = (state, lastPage) => {
    state.lastPage = lastPage
}

export const SET_SUCCESS_STATUS = (state, value) => {
    state.success = value
}