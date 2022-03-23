import { mount } from '@vue/test-utils'
import LegacyPolarArea from './examples/PolarArea.vue'

describe('LegacyPolarArea', () => {
  const Component = {
    template:
      '<div><LegacyPolarArea :chartId="chartId" :plugins="plugins" /></div>',
    components: { LegacyPolarArea },
    props: ['chartId', 'plugins']
  }

  it('should render a canvas', () => {
    const wrapper = mount(Component)

    const polarAreaChartEl = wrapper.find('#polar-chart')
    expect(polarAreaChartEl.element.id).not.toBe('undefined')
    expect(polarAreaChartEl.exists()).toBe(true)

    const canvasEl = wrapper.find('canvas')
    expect(canvasEl.exists()).toBe(true)
  })

  it('should change id based on prop', () => {
    const wrapper = mount(Component, {
      propsData: { chartId: 'polarchartprop' }
    })

    const polarAreaChartEl = wrapper.find('#polarchartprop')
    expect(polarAreaChartEl.element.id).not.toBe('undefined')
    expect(polarAreaChartEl.exists()).toBe(true)
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
