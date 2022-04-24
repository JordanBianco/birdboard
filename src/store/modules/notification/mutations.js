export const GET_NOTIFICATIONS = (state, notifications) => {
    state.notifications.push(...notifications)
}

export const GET_LAST_PAGE = (state, lastPage) => {
    state.lastPage = lastPage
}

export const GET_TOTAL = (state, total) => {
    state.total = total
}

export const EMPTY_NOTIFICATIONS = (state) => {
    state.notifications = []
    state.lastPage = null
    state.total = null
}

export const GET_LATEST_NOTIFICATIONS = (state, notifications) => {
    state.latestNotifications = notifications
}

export const MARK_AS_READ = (state, notification_id) => {
    // Devo segnare come letto sia nel latestNotifications sia in notifications (se presenti)
    let notificationInLatest
    let notificationInList

    notificationInLatest = state.latestNotifications.find(n => {
        return n.id === notification_id
    })

    notificationInList = state.notifications.find(n => {
        return n.id === notification_id
    })

    if (notificationInLatest) { notificationInLatest.read_at = 1 }
    if (notificationInList) { notificationInList.read_at = 1 }
}

export const MARK_ALL_AS_READ = (state) => {
    state.latestNotifications.map(notification => {
        notification.read_at = 1
    })

    state.notifications.map(notification => {
        notification.read_at = 1
    })
}

export const DELETE_NOTIFICATION = (state, notification_id) => {
    // Devo eliminare sia nel latestNotifications sia in notifications (se presenti)
    let notificationInLatest
    let notificationInList

    notificationInLatest = state.latestNotifications.find(n => {
        return n.id === notification_id
    })

    notificationInList = state.notifications.find(n => {
        return n.id === notification_id
    })

    if (notificationInLatest) { 
        state.latestNotifications.splice(state.latestNotifications.indexOf(notificationInLatest), 1)
    }

    state.notifications.splice(state.notifications.indexOf(notificationInList), 1)
    state.total = state.total - 1
}

export const DELETE_NOTIFICATIONS = (state) => {
    state.latestNotifications = []
    state.notifications = []
    state.total = 0
}