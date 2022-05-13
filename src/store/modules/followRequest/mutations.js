/** Ricevute */
export const GET_RECEIVED_FOLLOW_REQUESTS = (state, receivedFollowRequests) => {
    state.receivedFollowRequests.push(...receivedFollowRequests)
}

export const GET_RECEIVED_LAST_PAGE = (state, lastPage) => {
    state.receivedLastPage = lastPage
}

export const GET_RECEIVED_TOTAL = (state, total) => {
    state.receivedTotal = total
}

export const NEXT_RECEIVED_PAGE = (state) => {
    state.receivedPage = state.receivedPage + 1
}

export const REMOVE_FOLLOW_REQUEST_FROM_RECEIVED = (state, follower) => {
    state.receivedFollowRequests.splice(state.receivedFollowRequests.indexOf(follower), 1)
    state.receivedTotal = state.receivedTotal - 1
}

/** Quando ricevo una nuova notifica di follow, (file App.vue) la aggiungo alle richieste recenti */
export const PUSH_NEW_FOLLOW_REQUEST = (state, notification) => {
    state.receivedFollowRequests.unshift(notification.user)
}

/** Inviate */
export const GET_SENT_FOLLOW_REQUESTS = (state, sentFollowRequests) => {
    state.sentFollowRequests.push(...sentFollowRequests)
}

export const GET_SENT_LAST_PAGE = (state, lastPage) => {
    state.sentLastPage = lastPage
}

export const GET_SENT_TOTAL = (state, total) => {
    state.sentTotal = total
}

export const NEXT_SENT_PAGE = (state) => {
    state.sentPage = state.sentPage + 1
}

export const REMOVE_FOLLOW_REQUEST_FROM_SENT = (state, following) => {
    state.sentFollowRequests.splice(state.sentFollowRequests.indexOf(following), 1)
    state.sentTotal = state.sentTotal - 1
}

export const SET_SUCCESS_STATUS = (state, value) => {
    state.success = value
}

export const SET_FOLLOW_REQUEST_STATUS = (state, value) => {
    state.followRequestStatus = value
}