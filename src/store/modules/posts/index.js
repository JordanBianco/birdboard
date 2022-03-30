import state from '@/store/modules/posts/state'
import * as getters from '@/store/modules/posts/getters'
import * as actions from '@/store/modules/posts/actions'
import * as mutations from '@/store/modules/posts/mutations'

export default {
    namespaced: true,
    state,
    actions,
    mutations,
    getters
}