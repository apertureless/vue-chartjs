import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { Scatter } from '../src/index.js'
import * as scatterChartConfig from '../sandboxes/scatter/src/chartConfig.js'

describe('ScatterChart', () => {
  it('should render a canvas', () => {
    const wrapper = mount(Scatter, {
      props: scatterChartConfig as any
    })

    const canvas = wrapper.find('canvas')

    expect(canvas.exists()).toBe(true)
    expect(canvas.element.id).toBe('')
  })

  it('should change id based on prop', () => {
    const wrapper = mount(Scatter, {
      props: {
        id: 'scatter-chart-id',
        ...scatterChartConfig
      } as any
    })

    const canvas = wrapper.find('canvas')

    expect(canvas.exists()).toBe(true)
    expect(canvas.element.id).toBe('scatter-chart-id')
  })

  it('should add inline plugins based on prop', () => {
    const testPlugin = {
      id: 'test'
    }

    const wrapper = mount(Scatter, {
      props: {
        plugins: [testPlugin],
        ...scatterChartConfig
      } as any
    })

    expect(wrapper.props().plugins.length).toEqual(1)
  })
})
