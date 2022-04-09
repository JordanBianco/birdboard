import api from '@/apis/api'

export const getLastNotifications = async ({commit}, {id}) => {
    try {
        const res = await api.get('/user/' + id + '/last-notifications');
        if (res.status === 200) {
            commit('GET_LAST_NOTIFICATIONS', res.data)
        }
    } catch (error) {
        console.log(error)
    }
}