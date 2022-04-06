export const GET_USER_LIKES = (state, likes) => {
    state.likes = likes
}

// Resource può essere sia un post sia una reply// Resource
export const ADD_LIKE_TO_USERS_LIKES = (state, resource) => {
    state.likes.push({
        likeable_id: resource.id,
    })
}

export const REMOVE_LIKE_FROM_USERS_LIKES = (state, resource) => {
    let like

    like = state.likes.find(like => {
        return like.likeable_id === resource.id
    })

    state.likes.splice(state.likes.indexOf(like), 1)
}