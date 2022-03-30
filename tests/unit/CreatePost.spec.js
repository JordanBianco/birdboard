import { mount, createLocalVue } from '@vue/test-utils'
import CreatePost from '@/components/CreatePost'
import Vuex from 'vuex'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('CreatePost', () => {

    let store
    let actions
    let state

    beforeEach(() => {
        actions = {
            storePost: jest.fn()
        }

        state = {
            user: {},
            success: false
        }

        store = new Vuex.Store({
            modules: {
                user: {
                    namespaced: true,
                    actions
                },
                auth: {
                    namespaced: true,
                    state
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