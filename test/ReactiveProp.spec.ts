import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import ReactivePropChart from './examples/ReactivePropChart'

describe('ReactivePropChart', () => {
  const Component = {
    template: '<div><ReactivePropChart :chart-data="chartData" /></div>',
    components: { ReactivePropChart },
    props: ['chartData']
  }

  it('should render a canvas', () => {
    const wrapper = mount(Component, {
      props: { chartData: {} }
    })

    const canvasEl = wrapper.find('canvas')
    expect(canvasEl.exists()).toBe(true)
  })
})
