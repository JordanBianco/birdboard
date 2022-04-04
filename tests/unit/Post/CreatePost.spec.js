import { mount, createLocalVue } from '@vue/test-utils'
import CreatePost from '@/components/Post/CreatePost'
import Vuex from 'vuex'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('CreatePost', () => {

    let store
    let actions
    let mutations

    beforeEach(() => {
        actions = {
            storePost: jest.fn()
        }

        mutations = {
            SET_ERRORS: jest.fn()
        }

        store = new Vuex.Store({
            modules: {
                users: {
                    namespaced: true,
                    actions,
                    mutations,
                    state: { 
                        success: false,
                        errors: []
                    }
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
            store,
            stubs: ['ErrorMessages']
        })

        await wrapper.find('textarea').setValue('lorem ipsum')
        await wrapper.find('form').trigger('submit')

        expect(actions.storePost).toHaveBeenCalled()
    })

    test('body cannot be empty', async () => {
        const wrapper = mount(CreatePost, {
            localVue,
            store,
            stubs: ['ErrorMessages']
        })

        await wrapper.find('textarea').setValue('')
        await wrapper.find('form').trigger('submit')

        expect(actions.storePost).not.toHaveBeenCalled()
    })
})