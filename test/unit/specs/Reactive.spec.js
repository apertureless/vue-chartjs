import { mount } from '@vue/test-utils'
import ReactiveChart from '@/examples/components/reactive/reactive.vue'

describe('ReactiveChart', () => {
  it('should render a canvas', () => {
    const wrapper = mount(ReactiveChart)

    const canvasEl = wrapper.find('canvas')
    expect(canvasEl.exists()).toBe(true)
  })
})
