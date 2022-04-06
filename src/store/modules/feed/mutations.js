export const GET_ALL = (state, posts) => {
    state.posts = posts
}

export const ADD_LIKE_TO_POST = (_, post) => {
    post.likes_count = post.likes_count + 1
}

export const REMOVE_LIKE_FROM_POST = (_, post) => {
    post.likes_count = post.likes_count - 1
}