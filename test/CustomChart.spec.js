import { mount } from '@vue/test-utils'
import CustomChart from '@/examples/components/custom/custom.vue'

describe('CustomChart', () => {
  it('should render a canvas', () => {
    const wrapper = mount(CustomChart)

    const canvasEl = wrapper.find('canvas')
    expect(canvasEl.exists()).toBe(true)
  })
})
