export const GET_POSTS = (state, posts) => {
    state.posts = posts
}

export const STORE_POST = (state, post) => {
    state.posts.unshift(post)
}

export const SET_SUCCESS_STATUS = (state, value) => {
    state.success = value
}

export const DELETE_POST = (state, post) => {
    state.posts.splice(state.posts.indexOf(post), 1)
}