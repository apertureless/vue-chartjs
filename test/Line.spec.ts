import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { Line } from '../src/index.js'
import * as lineChartConfig from '../sandboxes/line/src/chartConfig.js'

describe('LineChart', () => {
  it('should render a canvas', () => {
    const wrapper = mount(Line, {
      props: lineChartConfig as any
    })

    const canvas = wrapper.find('canvas')

    expect(canvas.exists()).toBe(true)
    expect(canvas.element.id).toBe('')
  })

  it('should change id based on prop', () => {
    const wrapper = mount(Line, {
      props: {
        id: 'line-chart-id',
        ...lineChartConfig
      } as any
    })

    const canvas = wrapper.find('canvas')

    expect(canvas.exists()).toBe(true)
    expect(canvas.element.id).toBe('line-chart-id')
  })

  it('should add inline plugins based on prop', () => {
    const testPlugin = {
      id: 'test'
    }

    const wrapper = mount(Line, {
      props: {
        plugins: [testPlugin],
        ...lineChartConfig
      } as any
    })

    expect(wrapper.props().plugins.length).toEqual(1)
  })
})
