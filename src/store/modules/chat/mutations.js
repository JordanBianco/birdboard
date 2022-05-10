export const GET_SUGGESTED_USERS = (state, suggested) => {
    state.suggested = suggested
}

export const GET_CONVERSATIONS = (state, conversations) => {
    state.conversations = conversations
}

export const EMPTY_CONVERSATIONS = (state) => {
    state.conversations = []
}

// rivedere
export const ADD_TO_CONVERSATIONS = (state, {to, authUser}) => {
    let alreadyInList

    alreadyInList = state.conversations.find(user => {
        return user.to.id === to.id || user.from.id === to.id
    })

    if (! alreadyInList) {
        state.conversations.push({
            from: { id: authUser.id },
            to: to
        })
    }
}

export const GET_CHAT_HISTORY = (state, messages) => {    
    state.messages.unshift(...messages.data.reverse())
}

export const GET_CHAT_HISTORY_LAST_PAGE = (state, lastPage) => {
    state.lastPage = lastPage
}

export const EMPTY_CHAT_HISTORY = (state) => {
    state.messages = []
}

export const SET_SUCCESS_STATUS = (state, value) => {
    state.success = value
}

export const PUSH_MESSAGE = (state, message) => {
    state.messages.push(message)
}

export const NEXT_PAGE = (state) => {
    state.page = state.page + 1
}

export const RESET_PAGE = (state) => {
    state.page = 1
}

export const NEW_MESSAGE_RECEIVED = (state, {from, to}) => {
    // cerco l'utente con cui sto chattando nella lista delle chat iniziate
    let exists = state.conversations.find(user => {
        // Check se ho già messaggi ricevuti da quato utente
        return user.from.id === from.id
            // O se io ho già scritto a quest utente
            || user.to.id === from.id
    })

    if (exists) {
        exists.my_unread_messages.push({})
    } else {
        // Altrimenti creo una nuova conversazione
        state.conversations.unshift({
            from: from,
            to: to,
            my_unread_messages: [{}]
        })
    }
}

export const READ_ALL_UNREAD_MESSAGES = (state, {user}) => {    
    let exists = state.conversations.find(u => {
        // Check se ho già messaggi ricevuti da quato utente
        return u.from.id === user.id
            // O se io ho già scritto a quest utente
            || u.to.id === user.id
    })

    exists.my_unread_messages = []
}

export const READ_MESSAGE = (state, message) => {
    let mess = state.messages.find(m => {
        return m.id === message.id
    })

    mess.read = true
}

// Seleziona l'utente con cui chattare
export const SELECT_USER = (state, user) => {
    state.selectedUser = user
}

export const SET_TYPING_USER = (state, value) => {
    state.typingUser = value
}

export const IS_TYPING = (state, value) => {
    state.isTyping = value
}

export const SET_ONLINE_USERS = (state, users) => {
    state.onlineUsers = users
}

export const PUSH_ONLINE_USER = (state, user) => {
    state.onlineUsers.push(user)
}

export const REMOVE_ONLINE_USER = (state, user) => {
    state.onlineUsers.splice(state.onlineUsers.indexOf(user), 1)
}