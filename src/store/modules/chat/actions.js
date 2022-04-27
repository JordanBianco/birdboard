import api from '@/apis/api'

export const getChatStarted = async ({commit}, {username}) => {
    try {
        const res = await api.get('/user/' + username + '/chat-started')
        if (res.status === 200) {
            commit('GET_CHAT_STARTED', res.data)
        }
    } catch (error) {
        console.log(error)
    }
}

export const getChatHistory = async ({commit}, {id}) => {
    try {
        const res = await api.get('/user/' + id + '/messages')
        if (res.status === 200) {
            commit('GET_CHAT_HISTORY', res.data)
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