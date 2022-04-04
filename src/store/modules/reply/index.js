import state from '@/store/modules/reply/state'
import * as getters from '@/store/modules/reply/getters'
import * as actions from '@/store/modules/reply/actions'
import * as mutations from '@/store/modules/reply/mutations'

export default {
    namespaced: true,
    state,
    actions,
    mutations,
    getters
}