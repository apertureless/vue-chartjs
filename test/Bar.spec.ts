import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { Bar } from '../src/index.js'
import * as barChartConfig from '../sandboxes/bar/src/chartConfig.js'

describe('BarChart', () => {
  it('should render a canvas', () => {
    const wrapper = mount(Bar, {
      props: barChartConfig as any
    })

    const canvas = wrapper.find('canvas')

    expect(canvas.exists()).toBe(true)
    expect(canvas.element.id).toBe('')
  })

  it('should change id based on prop', () => {
    const wrapper = mount(Bar, {
      props: {
        id: 'bar-chart-id',
        ...barChartConfig
      } as any
    })

    const canvas = wrapper.find('canvas')

    expect(canvas.exists()).toBe(true)
    expect(canvas.element.id).toBe('bar-chart-id')
  })

  it('should add inline plugins based on prop', () => {
    const testPlugin = {
      id: 'test'
    }

    const wrapper = mount(Bar, {
      props: {
        plugins: [testPlugin],
        ...barChartConfig
      } as any
    })

    expect(wrapper.props().plugins.length).toEqual(1)
  })
})
