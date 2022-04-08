import state from '@/store/modules/follow/state'
import * as getters from '@/store/modules/follow/getters'
import * as actions from '@/store/modules/follow/actions'
import * as mutations from '@/store/modules/follow/mutations'

export default {
    namespaced: true,
    state,
    actions,
    mutations,
    getters
}