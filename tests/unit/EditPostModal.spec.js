import { mount, createLocalVue } from '@vue/test-utils'
import EditPostModal from '@/components/Dashboard/EditPostModal'
import Vuex from 'vuex'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('EditPostModal', () => {
    
    let postCopy
    let wrapper
    let store
    let actions

    beforeEach(() => {
        postCopy = {
            id: 1,
            body: 'lorem',
            user: {
                username: 'test'
            }
        }

        actions = {
            updatePost: jest.fn()
        }

        store = new Vuex.Store({
            modules: {
                users: {
                    namespaced: true,
                    actions
                },
            }
        })

        wrapper = mount(EditPostModal, {
            localVue,
            store,
            propsData: {
                postCopy
            }
        })
    })
    
    test('updatePost gets dispatched', async () => {

        await wrapper.find('textarea').setValue('lorem ipsum')
        await wrapper.find('form').trigger('submit')

        expect(actions.updatePost).toHaveBeenCalled()
    })

    test('receive a postCopy prop', () => {
        expect(wrapper.vm.$props.postCopy).toEqual(postCopy)
    })

    test('click overlay close the modal', async () => {
        await wrapper.find('#overlay').trigger('click')

        expect(wrapper.emitted().cancelEdit).toBeTruthy()
    })

    test('click cancel button close the modal', async () => {
        await wrapper.find('#cancel').trigger('click')

        expect(wrapper.emitted().cancelEdit).toBeTruthy()
    })
})