import state from '@/store/modules/followRequest/state'
import * as getters from '@/store/modules/followRequest/getters'
import * as actions from '@/store/modules/followRequest/actions'
import * as mutations from '@/store/modules/followRequest/mutations'

export default {
    namespaced: true,
    state,
    actions,
    mutations,
    getters
}