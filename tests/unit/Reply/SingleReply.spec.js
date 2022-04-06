import { mount, createLocalVue } from '@vue/test-utils'
import SingleReply from '@/components/Reply/SingleReply'
import EditReplyModal from '@/components/Reply/EditReplyModal'
import Vuex from 'vuex'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('SingleReply', () => {

    let store
    let actions
    let state
    let wrapper
    let reply
    let $route

    beforeEach(() => {
        $route = {
            params: { id : "1" }
        }
        
        actions = {
            deleteReply: jest.fn()
        }

        state = {
            user: {}
        }

        store = new Vuex.Store({
            modules: {
                reply: {
                    namespaced: true,
                    actions,
                },
                auth: {
                    namespaced: true,
                    state
                },
                like: {
                    namespaced: true,
                    state: { likes: [] }
                }
            }
        })

        reply = {
            replyable_id: 1,
            user: {
                name: 'user'
            }
        }

        wrapper = mount(SingleReply, {
            localVue,
            store,
            propsData: {
                reply
            },
            stubs: ['router-link'],
            mocks: {
                $route,
                $moment: () => jest.requireActual('moment')('2020-01-01T00:00:00.000Z')
            }
        })
    })
    

    test('it receive reply prop', () => {
        expect(wrapper.vm.$props.reply).toEqual(reply)
    })

    test('show edit modal when user click modifica', async () => {
        // Open the mini action menu
        await wrapper.find('#toggleActionMenu').trigger('click')

        expect(wrapper.findComponent(EditReplyModal).exists()).toBeFalsy()

        await wrapper.find('#openEditReplyModal').trigger('click')

        expect(wrapper.findComponent(EditReplyModal).exists()).toBeTruthy()
    })

    test('user can delete a reply', async () => {
        await wrapper.find('#toggleActionMenu').trigger('click')
        await wrapper.find('#deleteReply').trigger('click')

        expect(actions.deleteReply).toHaveBeenCalled()
    })
})