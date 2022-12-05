import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { Doughnut } from '../src/index.js'
import * as doughnutChartConfig from '../sandboxes/doughnut/src/chartConfig.js'

describe('DoughnutChart', () => {
  it('should render a canvas', () => {
    const wrapper = mount(Doughnut, {
      props: doughnutChartConfig as any
    })

    const canvas = wrapper.find('canvas')

    expect(canvas.exists()).toBe(true)
    expect(canvas.element.id).toBe('')
  })

  it('should change id based on prop', () => {
    const wrapper = mount(Doughnut, {
      props: {
        id: 'doughnut-chart-id',
        ...doughnutChartConfig
      } as any
    })

    const canvas = wrapper.find('canvas')

    expect(canvas.exists()).toBe(true)
    expect(canvas.element.id).toBe('doughnut-chart-id')
  })

  it('should add inline plugins based on prop', () => {
    const testPlugin = {
      id: 'test'
    }

    const wrapper = mount(Doughnut, {
      props: {
        plugins: [testPlugin],
        ...doughnutChartConfig
      } as any
    })

    expect(wrapper.props().plugins.length).toEqual(1)
  })
})
