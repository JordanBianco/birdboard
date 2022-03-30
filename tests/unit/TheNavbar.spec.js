import { mount, createLocalVue } from '@vue/test-utils'
import TheNavbar from '@/components/Layout/TheNavbar'
import Vuex from 'vuex'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('TheNavbar', () => {

    test('logo is present', () => {
        let state = {
            loggedIn: false,
            user: {}
        }

        let store = new Vuex.Store({
            modules: {
                auth: {
                    namespaced: true,
                    state
                }
            }
        })

        const wrapper = mount(TheNavbar, {
            localVue,
            store,
            stubs: ['router-link']
        })

        expect(wrapper.find('h1').text()).toEqual('Birdboard')
    })

    test('iscriviti is visible if user is not logged in', async () => {
        let state = {
            loggedIn: false,
            user: {}
        }

        let store = new Vuex.Store({
            modules: {
                auth: {
                    namespaced: true,
                    state
                }
            }
        })

        const wrapper = mount(TheNavbar, {
            localVue,
            store,
            stubs: ['router-link']
        })

        expect(wrapper.find('#signup').exists()).toBeTruthy()
    })

    test('iscriviti is not visible if user is logged in', async () => {
        let state = {
            loggedIn: true,
            user: {}
        }

        let store = new Vuex.Store({
            modules: {
                auth: {
                    namespaced: true,
                    state
                }
            }
        })

        const wrapper = mount(TheNavbar, {
            localVue,
            store,
            stubs: ['router-link']
        })

        expect(wrapper.find('#signup').exists()).toBeFalsy()
    })
})