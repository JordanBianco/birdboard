import state from '@/store/modules/user/state'
import * as getters from '@/store/modules/user/getters'
import * as actions from '@/store/modules/user/actions'
import * as mutations from '@/store/modules/user/mutations'

export default {
    namespaced: true,
    state,
    actions,
    mutations,
    getters
}