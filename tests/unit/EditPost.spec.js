import { mount, createLocalVue } from '@vue/test-utils'
import EditPost from '@/components/Dashboard/EditPost'
import Vuex from 'vuex'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('EditPost', () => {

    let post
    let store
    let actions

    beforeEach(() => {
        post = { 
            body: 'lorem',
        }

        actions = {
            updatePost: jest.fn()
        }

        store = new Vuex.Store({
            modules: {
                user: {
                    namespaced: true,
                    actions
                },
            }
        })
    })
    
    test('getPost gets dispatched', async () => {
        const wrapper = mount(EditPost, {
            localVue,
            store,
            propsData: {
                post
            }
        })

        await wrapper.find('textarea').setValue('lorem ipsum')
        await wrapper.find('form').trigger('submit')

        expect(actions.updatePost).toHaveBeenCalled()
    })
})