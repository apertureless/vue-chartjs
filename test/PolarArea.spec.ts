import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { PolarArea } from '../src'
import * as polarAreaChartConfig from '../sandboxes/polar-area/src/chartConfig'

describe('PolarAreaChart', () => {
  it('should render a canvas', () => {
    const wrapper = mount(PolarArea, {
      props: polarAreaChartConfig as any
    })

    const canvas = wrapper.find('canvas')

    expect(canvas.exists()).toBe(true)
    expect(canvas.element.id).toBe('')
  })

  it('should change id based on prop', () => {
    const wrapper = mount(PolarArea, {
      props: {
        id: 'polar-area-chart-id',
        ...polarAreaChartConfig
      } as any
    })

    const canvas = wrapper.find('canvas')

    expect(canvas.exists()).toBe(true)
    expect(canvas.element.id).toBe('polar-area-chart-id')
  })

  it('should add inline plugins based on prop', () => {
    const testPlugin = {
      id: 'test'
    }

    const wrapper = mount(PolarArea, {
      props: {
        plugins: [testPlugin],
        ...polarAreaChartConfig
      } as any
    })

    expect(wrapper.props().plugins.length).toEqual(1)
  })
})
