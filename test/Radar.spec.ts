import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { Radar } from '../src/index.js'
import * as radarChartConfig from '../sandboxes/radar/src/chartConfig.js'

describe('RadarChart', () => {
  it('should render a canvas', () => {
    const wrapper = mount(Radar, {
      props: radarChartConfig as any
    })

    const canvas = wrapper.find('canvas')

    expect(canvas.exists()).toBe(true)
    expect(canvas.element.id).toBe('')
  })

  it('should change id based on prop', () => {
    const wrapper = mount(Radar, {
      props: {
        id: 'radar-chart-id',
        ...radarChartConfig
      } as any
    })

    const canvas = wrapper.find('canvas')

    expect(canvas.exists()).toBe(true)
    expect(canvas.element.id).toBe('radar-chart-id')
  })

  it('should add inline plugins based on prop', () => {
    const testPlugin = {
      id: 'test'
    }

    const wrapper = mount(Radar, {
      props: {
        plugins: [testPlugin],
        ...radarChartConfig
      } as any
    })

    expect(wrapper.props().plugins.length).toEqual(1)
  })
})
