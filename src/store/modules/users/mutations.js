export const GET_USER = (state, user) => {
    state.user = user
}

export const GET_POSTS = (state, posts) => {
    state.posts = posts
}

export const GET_POST = (state, post) => {
    state.post = post
}

export const STORE_POST = (state, post) => {
    state.posts.unshift(post)
}

export const DELETE_POST = (state, post) => {
    state.posts.splice(state.posts.indexOf(post), 1)
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