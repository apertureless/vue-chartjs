import { mount } from '@vue/test-utils'
import BubbleChart from '@/examples/components/bubble/bubble.vue'

describe('BubbleChart', () => {
  it('should render a canvas', () => {
    const wrapper = mount(BubbleChart)

    const bubbleChartEl = wrapper.find('#bubble-chart')
    expect(bubbleChartEl.element.id).not.toBe('undefined')
    expect(bubbleChartEl.exists()).toBe(true)

    const canvasEl = wrapper.find('canvas')
    expect(canvasEl.exists()).toBe(true)
  })

  it('should change id based on prop', () => {
    const wrapper = mount(BubbleChart, {
      propsData: { chartId: 'bubblechartprop' }
    })

    const bubbleChartEl = wrapper.find('#bubblechartprop')
    expect(bubbleChartEl.element.id).not.toBe('undefined')
    expect(bubbleChartEl.exists()).toBe(true)
  })

  it('should destroy chart instance', done => {
    const wrapper = mount(BubbleChart)
    const { vm } = wrapper

    expect(vm.$children[0].$data._chart.chart.ctx).not.toBe(null)

    vm.$destroy()

    vm.$nextTick(() => {
      vm.$forceUpdate()
      expect(vm.$children[0].$data._chart.chart.ctx).toBe(null)
      done()
    })
  })

  it('should add an inline plugin to the array', () => {
    const testPlugin = {
      id: 'test'
    }

    const wrapper = mount(BubbleChart)
    const { vm } = wrapper

    expect(vm.$children[0].$data._plugins).toEqual([])
    vm.$children[0].addPlugin(testPlugin)

    expect(vm.$children[0].$data._plugins.length).toEqual(1)
  })

  it('should add inline plugins based on prop', () => {
    const testPlugin = {
      id: 'test'
    }

    const wrapper = mount(BubbleChart, {
      propsData: { plugins: [testPlugin] }
    })
    const { vm } = wrapper

    expect(vm.$children[0].$data._plugins.length).toEqual(1)
  })
})
