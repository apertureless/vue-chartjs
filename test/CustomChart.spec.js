import { mount } from '@vue/test-utils'
import CustomChart from './examples/CustomChart.vue'

describe('CustomChart', () => {
  const Component = {
    template: '<div><CustomChart /></div>',
    components: { CustomChart }
  }

  it('should render a canvas', () => {
    const wrapper = mount(Component)

    const canvasEl = wrapper.find('canvas')
    expect(canvasEl.exists()).toBe(true)
  })
})
