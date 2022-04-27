export const GET_CHAT_STARTED = (state, chatStarted) => {
    state.chatStarted.push(...chatStarted.data)
}

export const EMPTY_CHAT_STARTED = (state) => {
    state.chatStarted = []
}

export const ADD_TO_CHAT_STARTED = (state, {to, authUser}) => {
    let alreadyInList

    alreadyInList = state.chatStarted.find(user => {
        return user.to.id === to.id || user.from.id === to.id
    })

    if (! alreadyInList) {
        state.chatStarted.push({
            from: { id: authUser.id },
            to: to
        })
    }    
}

export const GET_CHAT_HISTORY = (state, messages) => {
    state.messages = messages
}

export const EMPTY_CHAT_HISTORY = (state) => {
    state.messages = []
}

export const GET_SUGGESTED_USERS = (state, suggested) => {
    state.suggested = suggested
}

export const SET_SUCCESS_STATUS = (state, value) => {
    state.success = value
}

export const PUSH_MESSAGE = (state, message) => {
    state.messages.data.push(message)
}