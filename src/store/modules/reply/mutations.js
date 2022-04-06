export const GET_REPLIES = (state, replies) => {
    state.replies = replies
}

export const STORE_REPLY = (state, reply) => {
    state.replies.unshift(reply)
}

export const DELETE_REPLY = (state, reply) => {
    state.replies.splice(state.replies.indexOf(reply), 1)
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