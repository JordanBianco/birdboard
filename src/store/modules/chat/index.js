import state from '@/store/modules/chat/state'
import * as getters from '@/store/modules/chat/getters'
import * as actions from '@/store/modules/chat/actions'
import * as mutations from '@/store/modules/chat/mutations'

export default {
    namespaced: true,
    state,
    actions,
    mutations,
    getters
}