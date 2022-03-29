import { mount } from '@vue/test-utils'
import LegacyDoughnut from './examples/Doughnut.vue'

describe('LegacyDoughnut', () => {
  const Component = {
    template:
      '<div><LegacyDoughnut :chartId="chartId" :plugins="plugins" /></div>',
    components: { LegacyDoughnut },
    props: ['chartId', 'plugins']
  }

  it('should render a canvas', () => {
    const wrapper = mount(Component)

    const doughnutChartEl = wrapper.find('#doughnut-chart')
    expect(doughnutChartEl.element.id).not.toBe('undefined')
    expect(doughnutChartEl.exists()).toBe(true)

    const canvasEl = wrapper.find('canvas')
    expect(canvasEl.exists()).toBe(true)
  })

  it('should change id based on prop', () => {
    const wrapper = mount(Component, {
      propsData: { chartId: 'doughnutchartprop' }
    })

    const doughnutChartEl = wrapper.find('#doughnutchartprop')
    expect(doughnutChartEl.element.id).not.toBe('undefined')
    expect(doughnutChartEl.exists()).toBe(true)
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
