import state from '@/store/modules/feed/state'
import * as getters from '@/store/modules/feed/getters'
import * as actions from '@/store/modules/feed/actions'
import * as mutations from '@/store/modules/feed/mutations'

export default {
    namespaced: true,
    state,
    actions,
    mutations,
    getters
}