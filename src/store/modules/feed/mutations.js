export const GET_FEED_POSTS = (state, posts) => {
    state.posts.push(...posts.data)
}

export const GET_LAST_PAGE = (state, lastPage) => {
    state.lastPage = lastPage
}

export const EMPTY_FEED_POSTS = (state) => {
    state.posts = []
    state.lastPage = null
}

export const ADD_LIKE_TO_POST = (_, post) => {
    post.likes_count = post.likes_count + 1
}

export const REMOVE_LIKE_FROM_POST = (_, post) => {
    post.likes_count = post.likes_count - 1
}