import state from '@/store/modules/notification/state'
import * as getters from '@/store/modules/notification/getters'
import * as actions from '@/store/modules/notification/actions'
import * as mutations from '@/store/modules/notification/mutations'

export default {
    namespaced: true,
    state,
    actions,
    mutations,
    getters
}