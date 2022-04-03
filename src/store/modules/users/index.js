import state from '@/store/modules/users/state'
import * as getters from '@/store/modules/users/getters'
import * as actions from '@/store/modules/users/actions'
import * as mutations from '@/store/modules/users/mutations'

export default {
    namespaced: true,
    state,
    actions,
    mutations,
    getters
}