export const GET_LOGGED_IN_USER_FOLLOWERS = (state, loggedInUserFollowers) => {
    state.loggedInUserFollowers = loggedInUserFollowers
}

export const GET_LOGGED_IN_USER_FOLLOWING = (state, loggedInUserFollowing) => {
    state.loggedInUserFollowing = loggedInUserFollowing
}

export const GET_USER_FOLLOWERS = (state, followers) => {
    state.followers = followers
}

export const GET_USER_FOLLOWING = (state, following) => {
    state.following = following
}

export const ADD_FOLLOWING = (state, {user, loggedInUser}) => {
    // Aggiungo l'utente alla lista dei following dell'utente loggato
    state.loggedInUserFollowing.push({
        id: user.id,
        name: user.name,
        username: user.username
    })

    // Aggiungo l'utente loggato alla lista dei followers dell'utente appena seguito
    state.followers.push({
        id: loggedInUser.id,
        name: loggedInUser.name,
        username: loggedInUser.username
    })
}

export const REMOVE_FOLLOWING = (state, {user, loggedInUser}) => {
    // Rimuovo l'utente dalla lista dei following dell'utente loggato
    let followingUser

    followingUser = state.loggedInUserFollowing.find(u => {
        return u.id === user.id
    })

    state.loggedInUserFollowing.splice(state.loggedInUserFollowing.indexOf(followingUser), 1)

    // Rimuovo dalla lista dei followers dell'utente, l'utente attualmente loggato
    let follower

    follower = state.followers.find(u => {
        return u.id === loggedInUser.id
    })

    state.followers.splice(state.followers.indexOf(follower), 1)
}

export const REMOVE_FOLLOWER = (state, {user, loggedInUser}) => {
    // Rimuovo l'utente dalla lista dei following dell'utente loggato
    let follower

    follower = state.loggedInUserFollowers.find(u => {
        return u.id === user.id
    })

    state.loggedInUserFollowers.splice(state.loggedInUserFollowers.indexOf(follower), 1)
}