export const GET_REPLIES = (state, replies) => {
    state.replies.push(...replies.data)
}

export const STORE_REPLY = (state, {reply, post}) => {
    state.replies.unshift(reply)

    // Aumento il numero di reply del post di 1
    post.replies_count = post.replies_count + 1
}

export const DELETE_REPLY = (state, {post, reply}) => {
    state.replies.splice(state.replies.indexOf(reply), 1)

    // Diminuisco il numero di reply del post di 1
    post.replies_count = post.replies_count - 1
}

export const SET_SUCCESS_STATUS = (state, value) => {
    state.success = value
}

export const SET_EDIT_SUCCESS_STATUS = (state, value) => {
    state.editSuccess = value
}

export const SET_ERRORS = (state, errors) => {
    state.errors = errors
}

export const ADD_LIKE_TO_REPLY = (_, reply) => {
    reply.likes_count = reply.likes_count + 1    
}

export const REMOVE_LIKE_FROM_REPLY = (_, reply) => {
    reply.likes_count = reply.likes_count - 1
}

export const GET_LAST_PAGE = (state, lastPage) => {
    state.lastPage = lastPage
}

export const EMPTY_REPLIES = (state) => {
    state.replies = []
    state.lastPage = null
}