import state from '@/store/modules/site/state'
import * as getters from '@/store/modules/site/getters'
import * as actions from '@/store/modules/site/actions'
import * as mutations from '@/store/modules/site/mutations'

export default {
    namespaced: true,
    state,
    actions,
    mutations,
    getters
}