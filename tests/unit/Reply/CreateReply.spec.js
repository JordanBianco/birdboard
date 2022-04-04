import { mount, createLocalVue } from '@vue/test-utils'
import CreateReply from '@/components/Reply/CreateReply'
import Vuex from 'vuex'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('CreateReply', () => {

    let store
    let actions
    let mutations
    let post

    beforeEach(() => {
        post = {
            id: 1
        }
        
        actions = {
            storeReply: jest.fn()
        }

        mutations = {
            SET_ERRORS: jest.fn()
        }

        store = new Vuex.Store({
            modules: {
                reply: {
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
                    state: { 
                        user: {}
                    }
                }
            }
        })
    })

    test('submit the form dispatch storeReply action', async () => {
        const wrapper = mount(CreateReply, {
            localVue,
            store,
            propsData: { post },
            stubs: ['ErrorMessages']
        })

        await wrapper.find('textarea').setValue('lorem ispum')
        await wrapper.find('form').trigger('submit')

        expect(actions.storeReply).toHaveBeenCalled()
    })
    
    test('body cannot be empty', async () => {
        const wrapper = mount(CreateReply, {
            localVue,
            store,
            propsData: { post },
            stubs: ['ErrorMessages']
        })

        await wrapper.find('textarea').setValue('')
        await wrapper.find('form').trigger('submit')

        expect(actions.storeReply).not.toHaveBeenCalled()
    })
})