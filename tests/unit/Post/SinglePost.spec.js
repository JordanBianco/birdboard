import { mount, createLocalVue } from '@vue/test-utils'
import SinglePost from '@/components/Post/SinglePost'
import EditPostModal from '@/components/Post/EditPostModal'
import Vuex from 'vuex'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('SinglePost', () => {

    let store
    let actions
    let state
    let wrapper
    let post
    let $route

    beforeEach(() => {
        actions = {
            deletePost: jest.fn()
        }

        state = {
            user: {}
        }

        $route = {
            name: 'post.show'
        }

        store = new Vuex.Store({
            modules: {
                users: {
                    namespaced: true,
                    actions,
                },
                auth: {
                    namespaced: true,
                    state
                }
            }
        })

        post = { 
            id: 1,
            body: 'lorem',
            user: {
                name: 'user',
                username: 'username',
            } 
        }

        wrapper = mount(SinglePost, {
            localVue,
            store,
            propsData: {
                post,
                replies_count: 1
            },
            stubs: ['router-link'],
            mocks: {
                $route,
                $moment: () => jest.requireActual('moment')('2020-01-01T00:00:00.000Z')
            }
        })
    })
    

    test('it receive post prop', () => {
        expect(wrapper.vm.$props.post).toEqual(post)
    })

    test('show edit modal when user click modifica', async () => {
        // Open the mini action menu
        await wrapper.find('#toggleActionMenu').trigger('click')

        expect(wrapper.findComponent(EditPostModal).exists()).toBeFalsy()

        await wrapper.find('#openEditPostModal').trigger('click')

        expect(wrapper.findComponent(EditPostModal).exists()).toBeTruthy()
    })

    test('user can delete a post', async () => {
        await wrapper.find('#toggleActionMenu').trigger('click')
        await wrapper.find('#deletePost').trigger('click')

        expect(actions.deletePost).toHaveBeenCalled()
    })
})