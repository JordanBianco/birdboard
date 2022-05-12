import state from '@/store/modules/popupNotification/state'
import * as getters from '@/store/modules/popupNotification/getters'
import * as actions from '@/store/modules/popupNotification/actions'
import * as mutations from '@/store/modules/popupNotification/mutations'

export default {
    namespaced: true,
    state,
    actions,
    mutations,
    getters
}