import { mount, createLocalVue } from '@vue/test-utils'
import TheFeed from '@/components/TheFeed'
import SinglePost from '@/components/SinglePost'
import Vuex from 'vuex'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('TheFeed', () => {

    let store
    let actions
    let state

    beforeEach(() => {
        actions = {
            getAll: jest.fn()
        }

        state = {
            posts: [{}, {}]
        }

        store = new Vuex.Store({
            modules: {
                feed: {
                    namespaced: true,
                    actions,
                    state
                }
            }
        })
    })
    

    test('getAll gets dispatched', async () => {
        mount(TheFeed, {
            localVue,
            store,
            stubs: ['SinglePost']
        })

        expect(actions.getAll).toHaveBeenCalled()
    })

    test('SinglePost component exists', async () => {
        const wrapper = mount(TheFeed, {
            localVue,
            store,
            stubs: ['SinglePost']
        })

        expect(wrapper.findComponent(SinglePost).exists()).toBeTruthy()
    })
})