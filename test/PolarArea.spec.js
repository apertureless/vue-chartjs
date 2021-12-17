import { mount } from '@vue/test-utils'
import PolarAreaChart from '@/examples/components/polar-area/polarArea.vue'

describe('PolarChart', () => {
  it('should render a canvas', () => {
    const wrapper = mount(PolarAreaChart)

    const polarAreaChartEl = wrapper.find('#polar-chart')
    expect(polarAreaChartEl.element.id).not.toBe('undefined')
    expect(polarAreaChartEl.exists()).toBe(true)

    const canvasEl = wrapper.find('canvas')
    expect(canvasEl.exists()).toBe(true)
  })

  it('should change id based on prop', () => {
    const wrapper = mount(PolarAreaChart, {
      propsData: { chartId: 'polarchartprop' }
    })

    const polarAreaChartEl = wrapper.find('#polarchartprop')
    expect(polarAreaChartEl.element.id).not.toBe('undefined')
    expect(polarAreaChartEl.exists()).toBe(true)
  })

  it('should destroy chart instance', done => {
    const wrapper = mount(PolarAreaChart)
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

    const wrapper = mount(PolarAreaChart)
    const { vm } = wrapper

    expect(vm.$children[0].$data._plugins).toEqual([])
    vm.$children[0].addPlugin(testPlugin)

    expect(vm.$children[0].$data._plugins.length).toEqual(1)
  })

  it('should add inline plugins based on prop', () => {
    const testPlugin = {
      id: 'test'
    }

    const wrapper = mount(PolarAreaChart, {
      propsData: { plugins: [testPlugin] }
    })
    const { vm } = wrapper

    expect(vm.$children[0].$data._plugins.length).toEqual(1)
  })
})
