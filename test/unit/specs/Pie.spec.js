import { mount } from '@vue/test-utils'
import PieChart from '@/examples/components/pie/pie.vue'

describe('PieChart', () => {
  it('should render a canvas', () => {
    const wrapper = mount(PieChart)

    const pieChartEl = wrapper.find('#pie-chart')
    expect(pieChartEl.element.id).not.toBe('undefined')
    expect(pieChartEl.exists()).toBe(true)

    const canvasEl = wrapper.find('canvas')
    expect(canvasEl.exists()).toBe(true)
  })

  it('should change id based on prop', () => {
    const wrapper = mount(PieChart, {
      propsData: { chartId: 'piechartprop' },
    })

    const pieChartEl = wrapper.find('#piechartprop')
    expect(pieChartEl.element.id).not.toBe('undefined')
    expect(pieChartEl.exists()).toBe(true)
  })
  it('should destroy chart instance', done => {
    const wrapper = mount(PieChart)
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

    const wrapper = mount(PieChart)
    const { vm } = wrapper

    expect(vm.$children[0].$data._plugins).toEqual([])
    vm.$children[0].addPlugin(testPlugin)

    expect(vm.$children[0].$data._plugins.length).toEqual(1)
  })

  it('should add inline plugins based on prop', () => {
    const testPlugin = {
      id: 'test',
    }

    const wrapper = mount(PieChart, {
      propsData: { plugins: [testPlugin] },
    })
    const { vm } = wrapper

    expect(vm.$children[0].$data._plugins.length).toEqual(1)
  })
})
