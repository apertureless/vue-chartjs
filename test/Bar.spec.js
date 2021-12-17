import { mount } from '@vue/test-utils'
import BarChart from '@/examples/components/bar/bar.vue'

describe('BarChart', () => {
  it('should render a canvas', () => {
    const wrapper = mount(BarChart)

    const barChart = wrapper.find('#bar-chart')
    expect(barChart.element.id).not.toBe('undefined')
    expect(barChart.exists()).toBe(true)

    const canvasEl = wrapper.find('canvas')
    expect(canvasEl.exists()).toBe(true)
  })

  it('should change id based on prop', () => {
    const wrapper = mount(BarChart, {
      propsData: { chartId: 'barchartprop' }
    })

    const barChart = wrapper.find('#barchartprop')
    expect(barChart.element.id).not.toBe('undefined')
    expect(barChart.exists()).toBe(true)
  })

  it('should destroy chart instance', done => {
    const wrapper = mount(BarChart)
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

    const wrapper = mount(BarChart)
    const { vm } = wrapper

    expect(vm.$children[0].$data._plugins).toEqual([])
    vm.$children[0].addPlugin(testPlugin)

    expect(vm.$children[0].$data._plugins.length).toEqual(1)
  })

  it('should add inline plugins based on prop', () => {
    const testPlugin = {
      id: 'test'
    }

    const wrapper = mount(BarChart, {
      propsData: { plugins: [testPlugin] }
    })
    const { vm } = wrapper

    expect(vm.$children[0].$data._plugins.length).toEqual(1)
  })
})
