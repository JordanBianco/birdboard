import { mount, createLocalVue } from '@vue/test-utils'
import SinglePost from '@/components/SinglePost'
import Vuex from 'vuex'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('SinglePost', () => {

    let store
    let actions
    let state
    let wrapper
    let post

    beforeEach(() => {
        actions = {
            deletePost: jest.fn()
        }

        state = {
            user: {}
        }

        store = new Vuex.Store({
            modules: {
                user: {
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
                id: 1,
                name: 'user',
                username: 'username',
                email: 'user@user.com'
            } 
        }

        wrapper = mount(SinglePost, {
            localVue,
            store,
            propsData: {
                post
            },
            stubs: ['router-link']
        })
    })
    

    test('it receive post prop', () => {
        expect(wrapper.vm.$props.post).toEqual(post)
    })

    test('user can delete a post', async () => {
        await wrapper.find('#toggleMenu').trigger('click')

        await wrapper.find('#deletePost').trigger('click')

        expect(actions.deletePost).toHaveBeenCalled()
    })
})