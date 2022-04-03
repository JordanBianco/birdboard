import { mount, createLocalVue } from '@vue/test-utils'
import CreatePost from '@/components/Dashboard/CreatePost'
import Vuex from 'vuex'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('CreatePost', () => {

    let store
    let actions

    beforeEach(() => {
        actions = {
            storePost: jest.fn()
        }

        store = new Vuex.Store({
            modules: {
                users: {
                    namespaced: true,
                    actions,
                    state: { success: false }
                },
                auth: {
                    namespaced: true,
                    state: { user: {} }
                }
            }
        })
    })
    

    test('submit the form dispatch an action', async () => {
        const wrapper = mount(CreatePost, {
            localVue,
            store
        })

        await wrapper.find('textarea').setValue('lorem ipsum')
        await wrapper.find('form').trigger('submit')

        expect(actions.storePost).toHaveBeenCalled()
    })

    test('body cannot be empty', async () => {
        const wrapper = mount(CreatePost, {
            localVue,
            store
        })

        await wrapper.find('textarea').setValue('')
        await wrapper.find('form').trigger('submit')

        expect(actions.storePost).not.toHaveBeenCalled()
    })
})