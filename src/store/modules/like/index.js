import state from '@/store/modules/like/state'
import * as getters from '@/store/modules/like/getters'
import * as actions from '@/store/modules/like/actions'
import * as mutations from '@/store/modules/like/mutations'

export default {
    namespaced: true,
    state,
    actions,
    mutations,
    getters
}