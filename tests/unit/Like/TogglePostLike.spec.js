//  test
import { mount, createLocalVue } from '@vue/test-utils'
import TogglePostLike from '@/components/Like/TogglePostLike'
import Vuex from 'vuex'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('TogglePostLike', () => {

    let store
    let post
    let actions

    const $router = {
        push: jest.fn()
    }
    const $route = {
        name: 'post.show'
    }


    beforeEach(() => {
        post = {
            id: 1,
            body: 'test'
        }

        actions = {
            addLikeToPost: jest.fn()
        }

        store = new Vuex.Store({
            modules: {
                like: {
                    namespaced: true,
                    actions,
                    state: {
                        likes: []
                    }
                }
            }
        })
    })
    
    test('it receive user and post prop', () => {
        let user = {
            id: 1,
            username: 'username'
        }
    
        const wrapper = mount(TogglePostLike, {
            localVue,
            store,
            propsData: {
                post,
                user
            }
        })

        expect(wrapper.vm.$props.post).toEqual(post)
        expect(wrapper.vm.$props.user).toEqual(user)
    })

    test('if not loggedIn user click on toggleLike button it redirect to signin page', async () => {

        let user = undefined
    
        const wrapper = mount(TogglePostLike, {
            localVue,
            store,
            propsData: {
                post,
                user
            },
            mocks: {
                $router
            }
        })

        expect(wrapper.vm.$props.user).toEqual(undefined)

        await wrapper.find('svg').trigger('click')

        expect($router.push).toHaveBeenCalled()
    })

    test('if loggedIn user click on toggleLike button it dispatch an action', async () => {
        let user = {
            id: 1,
            username: 'username'
        }
    
        const wrapper = mount(TogglePostLike, {
            localVue,
            store,
            propsData: {
                post,
                user
            },
            mocks: {
                $route
            }
        })

        await wrapper.find('svg').trigger('click')

        expect(actions.addLikeToPost).toHaveBeenCalled()
    })
})
