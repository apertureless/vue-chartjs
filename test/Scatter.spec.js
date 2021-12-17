import { mount } from '@vue/test-utils'
import ScatterChart from '@/examples/components/scatter/scatter.vue'

describe('ScatterChart', () => {
  it('should render a canvas', () => {
    const wrapper = mount(ScatterChart)

    const scatterChartEl = wrapper.find('#scatter-chart')
    expect(scatterChartEl.element.id).not.toBe('undefined')
    expect(scatterChartEl.exists()).toBe(true)

    const canvasEl = wrapper.find('canvas')
    expect(canvasEl.exists()).toBe(true)
  })

  it('should change id based on prop', () => {
    const wrapper = mount(ScatterChart, {
      propsData: { chartId: 'scatterchartprop' },
    })

    const scatterChartEl = wrapper.find('#scatterchartprop')
    expect(scatterChartEl.element.id).not.toBe('undefined')
    expect(scatterChartEl.exists()).toBe(true)
  })

  it('should destroy chart instance', done => {
    const wrapper = mount(ScatterChart)
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

    const wrapper = mount(ScatterChart)
    const { vm } = wrapper

    expect(vm.$children[0].$data._plugins).toEqual([])
    vm.$children[0].addPlugin(testPlugin)

    expect(vm.$children[0].$data._plugins.length).toEqual(1)
  })

  it('should add inline plugins based on prop', () => {
    const testPlugin = {
      id: 'test',
    }

    const wrapper = mount(ScatterChart, {
      propsData: { plugins: [testPlugin] },
    })
    const { vm } = wrapper

    expect(vm.$children[0].$data._plugins.length).toEqual(1)
  })
})
