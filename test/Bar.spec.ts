import { mount } from '@vue/test-utils'
import BarChart from './examples/BarChart'

describe('BarChart', () => {
  const Component = {
    template: '<div><BarChart :chartId="chartId" :plugins="plugins" /></div>',
    components: { BarChart },
    props: ['chartId', 'plugins']
  }

  it('should render a canvas', () => {
    const wrapper = mount(Component)

    const barChart = wrapper.find('#bar-chart')
    expect(barChart.element.id).not.toBe('undefined')
    expect(barChart.exists()).toBe(true)

    const canvasEl = wrapper.find('canvas')
    expect(canvasEl.exists()).toBe(true)
  })

  it('should change id based on prop', () => {
    const wrapper = mount(Component, {
      props: { chartId: 'barchartprop' }
    })

    const barChart = wrapper.find('#barchartprop')
    expect(barChart.element.id).not.toBe('undefined')
    expect(barChart.exists()).toBe(true)
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
