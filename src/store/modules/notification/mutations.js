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


export const NEW_POPUP_NOTIFICATION = (state, notification) => {
    /**
        Qui pusho direttamente ciò che arriva dall' API, quindi senza la chiave data
     */
    if (state.popupNotifications.length === 0) {
        state.popupNotifications.push(notification)
    }

    /**
        Va pushata anche nelle notifiche ricevute
        Laravel ritorna le notifiche dal DB in modo diverso da quelle viaBroadcast (broadcast non ha data)
        Quindi qui ricreo la struttura come fosse dal DB, e in base al tipo di notifica creo l'oggetto
    */
    let type = notification.type.replace("App\\Notifications\\", '')

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

        default:
            break;
    }
}

export const REMOVE_POPUP_NOTIFICATION = (state, notification) => {
    state.popupNotifications.splice(state.popupNotifications.indexOf(notification, 1))
}

export const NEXT_PAGE = (state) => {
    state.page = state.page + 1
}