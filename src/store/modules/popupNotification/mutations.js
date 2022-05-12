export const NEW_POPUP_NOTIFICATION = (state, notification) => {
    /**
     * Qui pusho direttamente ciò che arriva dall' API, quindi senza la chiave data 
     */
    if (state.popupNotifications.length === 0) {
        state.popupNotifications.push(notification)
    }
}

export const REMOVE_POPUP_NOTIFICATION = (state, notification) => {
    state.popupNotifications.splice(state.popupNotifications.indexOf(notification, 1))
}