import state from '@/store/modules/auth/state'
import * as getters from '@/store/modules/auth/getters'
import * as actions from '@/store/modules/auth/actions'
import * as mutations from '@/store/modules/auth/mutations'

export default {
    namespaced: true,
    state,
    actions,
    mutations,
    getters
}