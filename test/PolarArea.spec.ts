import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import PolarAreaChart from './examples/PolarAreaChart'

describe('PolarChart', () => {
  const Component = {
    template:
      '<div><PolarAreaChart :chartId="chartId" :plugins="plugins" /></div>',
    components: { PolarAreaChart },
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
      props: { chartId: 'polarchartprop' }
    })

    const polarAreaChartEl = wrapper.find('#polarchartprop')
    expect(polarAreaChartEl.element.id).not.toBe('undefined')
    expect(polarAreaChartEl.exists()).toBe(true)
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
