import { mount } from '@vue/test-utils'
import LegacyBar from './examples/Bar.vue'

describe('LegacyBar', () => {
  const Component = {
    template: '<div><LegacyBar :chart-id="chartId" :plugins="plugins" /></div>',
    components: { LegacyBar },
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
      propsData: { chartId: 'barchartprop' }
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
      propsData: { plugins: [testPlugin] }
    })

    expect(wrapper.props().plugins.length).toEqual(1)
  })
})
