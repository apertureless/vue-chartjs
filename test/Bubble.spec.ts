import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { Bubble } from '../src/index.js'
import * as bubbleChartConfig from '../sandboxes/bubble/src/chartConfig.js'

describe('BubbleChart', () => {
  it('should render a canvas', () => {
    const wrapper = mount(Bubble, {
      props: bubbleChartConfig as any
    })

    const canvas = wrapper.find('canvas')

    expect(canvas.exists()).toBe(true)
    expect(canvas.element.id).toBe('')
  })

  it('should change id based on prop', () => {
    const wrapper = mount(Bubble, {
      props: {
        id: 'bubble-chart-id',
        ...bubbleChartConfig
      } as any
    })

    const canvas = wrapper.find('canvas')

    expect(canvas.exists()).toBe(true)
    expect(canvas.element.id).toBe('bubble-chart-id')
  })

  it('should add inline plugins based on prop', () => {
    const testPlugin = {
      id: 'test'
    }

    const wrapper = mount(Bubble, {
      props: {
        plugins: [testPlugin],
        ...bubbleChartConfig
      } as any
    })

    expect(wrapper.props().plugins.length).toEqual(1)
  })
})
