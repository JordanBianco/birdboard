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

export const MARK_AS_READ = (state, notification_id) => {
    let notificationInList = state.notifications.find(n => {
        return n.id === notification_id
    })

    if (notificationInList) {
        notificationInList.read_at = 1
    }
}

export const MARK_ALL_AS_READ = (state) => {
    state.notifications.map(notification => {
        notification.read_at = 1
    })
}

export const DELETE_NOTIFICATION = (state, notification_id) => {
    let notificationInList = state.notifications.find(n => {
        return n.id === notification_id
    })

    state.notifications.splice(state.notifications.indexOf(notificationInList), 1)
    state.total = state.total - 1
}

export const DELETE_NOTIFICATIONS = (state) => {
    state.notifications = []
    state.total = 0
}

export const NEXT_PAGE = (state) => {
    state.page = state.page + 1
}

export const PUSH_NEW_NOTIFICATION = (state, {notification, type}) => {

    switch (type) {
        case 'NewReply':
            state.notifications.unshift({
                id: notification.id,
                type: notification.type,
                data: {
                    post: notification.post,
                    reply: notification.reply,
                },
                read_at: null,
                created_at: notification.created_at
            })
            break;

        case 'NewLikeToPost':
            state.notifications.unshift({
                id: notification.id,
                type: notification.type,
                data: {
                    post: notification.post,
                    user: notification.user,
                },
                read_at: null,
                created_at: notification.created_at
            })
            break;

        case 'NewLikeToReply':
            state.notifications.unshift({
                id: notification.id,
                type: notification.type,
                data: {
                    reply: notification.reply,
                    user: notification.user,
                },
                read_at: null,
                created_at: notification.created_at
            })
            break;

        case 'NewFollowRequestReceived':
            state.notifications.unshift({
                id: notification.id,
                type: notification.type,
                data: {
                    user: notification.user,
                },
                read_at: null,
                created_at: notification.created_at
            })
            break;

        default:
            break;
    }
}