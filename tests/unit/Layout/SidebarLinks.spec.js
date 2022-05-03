import { mount } from '@vue/test-utils'
import TheSidebar from '@/components/Layout/TheSidebar'

describe('TheSidebar', () => {

    test('Home link is visible', () => {
        const wrapper = mount(TheSidebar, {
            stubs: ['router-link']
        })

        expect(wrapper.text()).toContain('Home')
    })
})