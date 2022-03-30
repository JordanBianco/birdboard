import { mount } from '@vue/test-utils'
import SidebarLinks from '@/components/Layout/SidebarLinks'

describe('SidebarLinks', () => {

    test('Home link is visible', () => {
        const wrapper = mount(SidebarLinks, {
            stubs: ['router-link']
        })

        expect(wrapper.text()).toContain('Home')
    })
})