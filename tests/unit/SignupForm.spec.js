import { mount, createLocalVue } from '@vue/test-utils'
import SignupForm from '@/components/Auth/SignupForm'
import Vuex from 'vuex'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('SignupForm', () => {

    let wrapper
    let store
    let actions
    let state
    let mutations

    beforeEach(() => {
        actions = {
            signup: jest.fn()
        }

        state = {
            errors: []
        }

        mutations = {
            SET_ERRORS: jest.fn()
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

        wrapper =  mount(SignupForm, {
            localVue,
            store
        })
    })
    

    test('can toggle password input', async () => {
        expect(wrapper.vm.$data.showPassword).toBeFalsy()
        await wrapper.find('#toggle').trigger('click')
        expect(wrapper.vm.$data.showPassword).toBeTruthy()
    })

    test('signup action is dispatched on form submit', async () => {
        await wrapper.find('form').trigger('submit.prevent')
        expect(actions.signup).toHaveBeenCalled()
    })
})