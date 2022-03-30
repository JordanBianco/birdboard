import { mount, createLocalVue } from '@vue/test-utils'
import SigninForm from '@/components/Auth/SigninForm'
import Vuex from 'vuex'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('SigninForm', () => {

    let wrapper
    let store
    let actions
    let state
    let mutations

    beforeEach(() => {
        actions = {
            signin: jest.fn()
        }
        
        mutations = {
            SET_ERRORS: jest.fn()
        }

        state = {
            errors: []
        }

        store = new Vuex.Store({
            modules: {
                auth: {
                    namespaced: true,
                    actions,
                    state,
                    mutations
                }
            }
        })

        wrapper =  mount(SigninForm, {
            localVue,
            store
        })
    })

    test('signin action is dispatched on form submit', async () => {
        await wrapper.find('form').trigger('submit.prevent')
        expect(actions.signin).toHaveBeenCalled()
    })
})