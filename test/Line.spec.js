import { mount } from '@vue/test-utils'
import LineChart from '@/examples/components/line/line.vue'

describe('LineChart', () => {
  it('should render a canvas', () => {
    const wrapper = mount(LineChart)

    const lineChartEl = wrapper.find('#line-chart')
    expect(lineChartEl.element.id).not.toBe('undefined')
    expect(lineChartEl.exists()).toBe(true)

    const canvasEl = wrapper.find('canvas')
    expect(canvasEl.exists()).toBe(true)
  })

  it('should change id based on prop', () => {
    const wrapper = mount(LineChart, {
      propsData: { chartId: 'linechartprop' },
    })

    const lineChartEl = wrapper.find('#linechartprop')
    expect(lineChartEl.element.id).not.toBe('undefined')
    expect(lineChartEl.exists()).toBe(true)
  })

  it('should destroy chart instance', done => {
    const wrapper = mount(LineChart)
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
      id: 'test',
    }

    const wrapper = mount(LineChart)
    const { vm } = wrapper

    expect(vm.$children[0].$data._plugins).toEqual([])
    vm.$children[0].addPlugin(testPlugin)

    expect(vm.$children[0].$data._plugins.length).toEqual(1)
  })

  it('should add inline plugins based on prop', () => {
    const testPlugin = {
      id: 'test',
    }

    const wrapper = mount(LineChart, {
      propsData: { plugins: [testPlugin] },
    })
    const { vm } = wrapper

    expect(vm.$children[0].$data._plugins.length).toEqual(1)
  })
})
