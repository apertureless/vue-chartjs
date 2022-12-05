import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { Pie } from '../src/index.js'
import * as pieChartConfig from '../sandboxes/pie/src/chartConfig.js'

describe('PieChart', () => {
  it('should render a canvas', () => {
    const wrapper = mount(Pie, {
      props: pieChartConfig as any
    })

    const canvas = wrapper.find('canvas')

    expect(canvas.exists()).toBe(true)
    expect(canvas.element.id).toBe('')
  })

  it('should change id based on prop', () => {
    const wrapper = mount(Pie, {
      props: {
        id: 'pie-chart-id',
        ...pieChartConfig
      } as any
    })

    const canvas = wrapper.find('canvas')

    expect(canvas.exists()).toBe(true)
    expect(canvas.element.id).toBe('pie-chart-id')
  })

  it('should add inline plugins based on prop', () => {
    const testPlugin = {
      id: 'test'
    }

    const wrapper = mount(Pie, {
      props: {
        plugins: [testPlugin],
        ...pieChartConfig
      } as any
    })

    expect(wrapper.props().plugins.length).toEqual(1)
  })
})
