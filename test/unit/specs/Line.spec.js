import Vue from 'vue'
import LineChart from '@/examples/LineExample'

describe('LineChart', () => {
  let el

  beforeEach(() => {
    el = document.createElement('div')
  })

  it('should render a canvas', () => {
    const vm = new Vue({
      render: function (createElement) {
        return createElement(
          LineChart
        )
      },
      components: { LineChart }
    }).$mount(el)

    expect(vm.$el.querySelector('#line-chart')).not.to.be.an('undefined')
    expect(vm.$el.querySelector('canvas')).not.to.be.an('undefined')
    expect(vm.$el.querySelector('canvas')).not.to.be.an('null')
    expect(vm.$el.querySelector('canvas')).to.exist
  })

  it('should change id based on prop', () => {
    const vm = new Vue({
      render: function (createElement) {
        return createElement(
          LineChart, {
            props: {
              chartId: 'linechartprop'
            }
          }
        )
      },
      components: { LineChart }
    }).$mount(el)

    expect(vm.$el.querySelector('#linechartprop')).not.to.be.an('undefined')
  })

  it('should destroy chart instance', (done) => {
    const vm = new Vue({
      render: function (createElement) {
        return createElement(
          LineChart
        )
      },
      components: { LineChart }
    }).$mount(el)

    expect(vm.$children[0].$data._chart.chart.ctx).not.to.be.null

    vm.$destroy()

    vm.$nextTick(() => {
      vm.$forceUpdate()
      expect(vm.$children[0].$data._chart.chart.ctx).to.be.null
      done()
    })
  })

  it('should add an inline plugin to the array', () => {
    const testPlugin = {
      id: 'test'
    }

    const vm = new Vue({
      render: function (createElement) {
        return createElement(
          LineChart
        )
      },
      components: { LineChart }
    }).$mount(el)

    expect(vm.$children[0].$data._plugins).to.exist
    vm.$children[0].addPlugin(testPlugin)

    expect(vm.$children[0].$data._plugins.length).to.equal(1)
  })

  it('should add inline plugins based on prop', () => {
    const testPlugin = {
      id: 'test'
    }

    const vm = new Vue({
      render: function (createElement) {
        return createElement(
          LineChart, {
            props: {
              plugins: [testPlugin]
            }
          }
        )
      },
      components: { LineChart }
    }).$mount(el)

    expect(vm.$children[0].$data._plugins).to.exist
    expect(vm.$children[0].$data._plugins.length).to.equal(1)
  })
})
