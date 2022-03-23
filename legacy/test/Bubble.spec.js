import { mount } from '@vue/test-utils'
import LegacyBubble from './examples/Bubble.vue'

describe('LegacyBubble', () => {
  const Component = {
    template:
      '<div><LegacyBubble :chartId="chartId" :plugins="plugins" /></div>',
    components: { LegacyBubble },
    props: ['chartId', 'plugins']
  }

  it('should render a canvas', () => {
    const wrapper = mount(Component)

    const bubbleChartEl = wrapper.find('#bubble-chart')
    expect(bubbleChartEl.element.id).not.toBe('undefined')
    expect(bubbleChartEl.exists()).toBe(true)

    const canvasEl = wrapper.find('canvas')
    expect(canvasEl.exists()).toBe(true)
  })

  it('should change id based on prop', () => {
    const wrapper = mount(Component, {
      propsData: { chartId: 'bubblechartprop' }
    })

    const bubbleChartEl = wrapper.find('#bubblechartprop')
    expect(bubbleChartEl.element.id).not.toBe('undefined')
    expect(bubbleChartEl.exists()).toBe(true)
  })

  it('should add inline plugins based on prop', () => {
    const testPlugin = {
      title: {
        display: true
      }
    }

    const wrapper = mount(Component, {
      propsData: { plugins: testPlugin }
    })

    expect(Object.keys(wrapper.props().plugins).length).toEqual(1)
  })
})
