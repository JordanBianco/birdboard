import api from '@/apis/api'

export const getNotifications = async ({commit}, {id, page}) => {
    try {
        const res = await api.get('/user/' + id + '/notifications?page=' + page);
        if (res.status === 200) {
            commit('GET_NOTIFICATIONS', res.data.data)
            commit('GET_LAST_PAGE', res.data.last_page)
            commit('GET_TOTAL', res.data.total)
        }
    } catch (error) {
        console.log(error)
    }
}

export const markAsRead = async ({commit}, {user, notification_id}) => {
    try {
        const res = await api.post('/user/' + user.id + '/notification', {
            notification_id: notification_id
        });
        if (res.status === 200) {
            commit('MARK_AS_READ', notification_id)
        }
    } catch (error) {
        console.log(error)
    }
}

export const markAllAsRead = async ({commit}, {user}) => {
    try {
        const res = await api.post('/user/' + user.id + '/read-all');
        if (res.status === 200) {
            commit('MARK_ALL_AS_READ')
        }
    } catch (error) {
        console.log(error)
    }
}

export const deleteNotification = async ({commit}, {user, notification_id}) => {
    try {
        const res = await api.delete('/user/' + user.id + '/notification', { 
            params: {
                notification_id: notification_id
            }
        });
        if (res.status === 200) {
            commit('DELETE_NOTIFICATION', notification_id)
        }
    } catch (error) {
        console.log(error)
    }
}

export const deleteAll = async ({commit}, {user}) => {
    try {
        const res = await api.delete('/user/' + user.id + '/notifications');
        if (res.status === 200) {
            commit('DELETE_NOTIFICATIONS')
        }
    } catch (error) {
        console.log(error)
    }
}