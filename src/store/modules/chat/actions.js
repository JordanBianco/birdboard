import api from '@/apis/api'

export const getConversations = async ({commit}, {username}) => {
    try {
        const res = await api.get('/user/' + username + '/conversations')
        if (res.status === 200) {
            commit('GET_CONVERSATIONS', res.data.data)
        }
    } catch (error) {
        console.log(error)
    }
}

export const getChatHistory = async ({commit}, {id, page}) => {
    try {
        const res = await api.get('/user/' + id + '/messages?page=' + page)
        if (res.status === 200) {
            commit('GET_CHAT_HISTORY', res.data)
            commit('GET_CHAT_HISTORY_LAST_PAGE', res.data.meta.last_page)
        }
    } catch (error) {
        console.log(error)
    }
}

export const getSuggestedUsers = async ({commit}, {username, search}) => {
    try {
        const res = await api.get('/user/' + username + '/suggested?search=' + search)
        if (res.status === 200) {
            commit('GET_SUGGESTED_USERS', res.data.data)
        }
    } catch (error) {
        console.log(error)
    }
}

export const sendMessage = async ({commit}, {to, message}) => {
    try {
        const res = await api.post('/user/' + to.id + '/message', {
            body: message.body
        })
        if (res.status === 201) {
            commit('SET_SUCCESS_STATUS', true)
            commit('PUSH_MESSAGE', res.data.data)
        }
    } catch (error) {
        console.log(error)
    }
}

export const readMessage = async ({commit}, {message}) => {
    try {
        const res = await api.patch('/message/read/' + message.id)
        if (res.status === 200) {
            commit('READ_MESSAGE', message)
        }
    } catch (error) {
        console.log(error)
    }
}

export const readAllUnreadMessages = async ({commit}, {user}) => {
    try {
        const res = await api.patch('/user/' + user.id + '/read')
        if (res.status === 200) {
            commit('READ_ALL_UNREAD_MESSAGES', {user})
        }
    } catch (error) {
        console.log(error)
    }
}