import { mount } from '@vue/test-utils'
import DoughnutChart from '@/examples/components/doughnut/doughnut.vue'

describe('DoughnutChart', () => {
  it('should render a canvas', () => {
    const wrapper = mount(DoughnutChart)

    const doughnutChartEl = wrapper.find('#doughnut-chart')
    expect(doughnutChartEl.element.id).not.toBe('undefined')
    expect(doughnutChartEl.exists()).toBe(true)

    const canvasEl = wrapper.find('canvas')
    expect(canvasEl.exists()).toBe(true)
  })

  it('should change id based on prop', () => {
    const wrapper = mount(DoughnutChart, {
      propsData: { chartId: 'doughnutchartprop' },
    })

    const doughnutChartEl = wrapper.find('#doughnutchartprop')
    expect(doughnutChartEl.element.id).not.toBe('undefined')
    expect(doughnutChartEl.exists()).toBe(true)
  })

  it('should destroy chart instance', done => {
    const wrapper = mount(DoughnutChart)
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

    const wrapper = mount(DoughnutChart)
    const { vm } = wrapper

    expect(vm.$children[0].$data._plugins).toEqual([])
    vm.$children[0].addPlugin(testPlugin)

    expect(vm.$children[0].$data._plugins.length).toEqual(1)
  })

  it('should add inline plugins based on prop', () => {
    const testPlugin = {
      id: 'test',
    }

    const wrapper = mount(DoughnutChart, {
      propsData: { plugins: [testPlugin] },
    })
    const { vm } = wrapper

    expect(vm.$children[0].$data._plugins.length).toEqual(1)
  })
})
