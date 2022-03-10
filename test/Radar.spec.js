import { mount } from '@vue/test-utils'
import RadarChart from './examples/RadarChart.vue'

describe('RadarChart', () => {
  const Component = {
    template: '<div><RadarChart :chartId="chartId" :plugins="plugins" /></div>',
    components: { RadarChart },
    props: ['chartId', 'plugins']
  }

  it('should render a canvas', () => {
    const wrapper = mount(Component)

    const radarChartEl = wrapper.find('#radar-chart')
    expect(radarChartEl.element.id).not.toBe('undefined')
    expect(radarChartEl.exists()).toBe(true)

    const canvasEl = wrapper.find('canvas')
    expect(canvasEl.exists()).toBe(true)
  })

  it('should change id based on prop', () => {
    const wrapper = mount(Component, {
      props: { chartId: 'rodarchartprop' }
    })

    const radarChartEl = wrapper.find('#rodarchartprop')
    expect(radarChartEl.element.id).not.toBe('undefined')
    expect(radarChartEl.exists()).toBe(true)
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
