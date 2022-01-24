import { mount } from '@vue/test-utils'
import ReactiveChart from './examples/ReactiveChart.vue'

describe('ReactiveChart', () => {
  const Component = {
    template: '<div><ReactiveChart /></div>',
    components: { ReactiveChart }
  }

  it('should render a canvas', () => {
    const wrapper = mount(Component)

    const canvasEl = wrapper.find('canvas')
    expect(canvasEl.exists()).toBe(true)
  })
})
