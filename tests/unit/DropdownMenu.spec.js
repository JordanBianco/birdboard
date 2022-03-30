import { mount, createLocalVue } from '@vue/test-utils'
import DropdownMenu from '@/components/Dashboard/DropdownMenu'
import Vuex from 'vuex'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('DropdownMenu', () => {

    let actions
    let store
    let state
    let wrapper

    beforeEach(() => {
        actions = {
            signout: jest.fn()
        }

        state = {
            user: {}
        }

        store = new Vuex.Store({
            modules: {
                auth: {
                    namespaced: true,
                    actions,
                    state
                }
            }
        })

        wrapper = mount(DropdownMenu, {
            localVue,
            store,
            stubs: ['router-link']
        })
    })

    test('action signout is dispatched', async () => {
        await wrapper.find('#avatar').trigger('click')

        await wrapper.find('#signout').trigger('click')
        expect(actions.signout).toHaveBeenCalled()
    })
})