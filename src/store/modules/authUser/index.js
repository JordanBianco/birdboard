import state from '@/store/modules/authUser/state'
import * as getters from '@/store/modules/authUser/getters'
import * as actions from '@/store/modules/authUser/actions'
import * as mutations from '@/store/modules/authUser/mutations'

export default {
    namespaced: true,
    state,
    actions,
    mutations,
    getters
}