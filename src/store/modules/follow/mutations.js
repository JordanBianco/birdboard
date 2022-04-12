// FOLLOWERS
export const GET_LOGGED_IN_USER_FOLLOWERS = (state, loggedInUserFollowers) => {
    state.loggedInUserFollowers = loggedInUserFollowers
}

export const GET_USER_FOLLOWERS = (state, followers) => {
    state.followers.push(...followers.data)
}

export const EMPTY_FOLLOWERS = (state) => {
    state.followers = []
    state.lastPage = null
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

// FOLLOWING
export const GET_LOGGED_IN_USER_FOLLOWING = (state, loggedInUserFollowing) => {
    state.loggedInUserFollowing = loggedInUserFollowing
}

export const GET_USER_FOLLOWING = (state, following) => {
    state.following.push(...following.data)
}

export const EMPTY_FOLLOWING = (state) => {
    state.following = []
    state.lastPage = null
}

export const GET_LAST_PAGE = (state, lastPage) => {
    state.lastPage = lastPage
}   

export const ADD_FOLLOWING = (state, {user, loggedInUser}) => {
    // Aggiungo l'utente alla lista dei following dell'utente loggato
    state.loggedInUserFollowing.push({
        id: user.id,
        name: user.name,
        username: user.username
    })

    // Aggiungo l'utente loggato alla lista dei followers dell'utente appena seguito
    // CODICE CHE NON SERVE PIU (tengo per reference) 
    // con il nuovo modo di prendere i followers dall'api (cliccando su followers mando una richiesta al server)
    // NON serve più pushare il follower nello state (in quanto viene preso già dall'api)
    
    // state.followers.push({
    //     id: loggedInUser.id,
    //     name: loggedInUser.name,
    //     username: loggedInUser.username
    // })

    user.followers_count = user.followers_count + 1
}

export const REMOVE_FOLLOWING = (state, {followed, user, value}) => {
    // Rimuovo l'utente sia dalla lista dei following (che mostro nella dashboard)
    let followedInList
    followedInList = state.following.find(f => {
        return f.id === followed.id
    })
    state.following.splice(state.following.indexOf(followedInList), 1)

    // sia dalla lista dei following salvata nel persisted.state
    let followedInPersisted
    followedInPersisted = state.loggedInUserFollowing.find(f => {
        return f.id === followed.id
    })
    state.loggedInUserFollowing.splice(state.loggedInUserFollowing.indexOf(followedInPersisted), 1)
    
    // DIPENDE DA DOVE SI ARRIVA
    if (value === false) {
        // SE DAL PROFILO DELL'UTENTE CHE SMETTO DI SEGUIRE, DIMINUISCO IL NUMERO DEI FOLLOWER DI 1
        followed.followers_count = followed.followers_count - 1
    } else {
        // SE DAL PROFILO PERSONALE, DIMINUISCO IL NUMERO DEI SEGUITI (FOLLOWING ) DI 1
        // E RIMUOVO L'UTENTE CHE NON SEGUO PIU DALLA LISTA DEL PERSISTED.STATE
        user.following_count = user.following_count - 1
    }
}