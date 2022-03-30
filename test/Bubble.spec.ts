import { mount } from '@vue/test-utils'
import BubbleChart from './examples/BubbleChart'

describe('BubbleChart', () => {
  const Component = {
    template:
      '<div><BubbleChart :chartId="chartId" :plugins="plugins" /></div>',
    components: { BubbleChart },
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
      props: { chartId: 'bubblechartprop' }
    })

    const bubbleChartEl = wrapper.find('#bubblechartprop')
    expect(bubbleChartEl.element.id).not.toBe('undefined')
    expect(bubbleChartEl.exists()).toBe(true)
  })

  it('should add inline plugins based on prop', () => {
    const testPlugin = {
      id: 'test'
    }

    const wrapper = mount(Component, {
      props: { plugins: [testPlugin] }
    })

    expect(wrapper.props().plugins.length).toEqual(1)
  })
})
