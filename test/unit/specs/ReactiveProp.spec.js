import { mount } from '@vue/test-utils'
import ReactivePropChart from '@/examples/components/reactive-prop/reactiveProp.vue'

describe('ReactivePropChart', () => {
  it('should render a canvas', () => {
    const wrapper = mount(ReactivePropChart)

    const canvasEl = wrapper.find('canvas')
    expect(canvasEl.exists()).toBe(true)
  })
})
