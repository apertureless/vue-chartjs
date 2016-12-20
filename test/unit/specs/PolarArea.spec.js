import Vue from 'vue'
import PolarChart from 'src/examples/PolarAreaExample'

describe('PolarChart', () => {
  let el

  beforeEach(() => {
    el = document.createElement('div')
  })

  it('should render a canvas', () => {
    const vm = new Vue({
      render: function (createElement) {
        return createElement(
          PolarChart
        )
      },
      components: { PolarChart }
    }).$mount(el)

    expect(vm.$el.querySelector('#polar-chart')).not.to.be.an('undefined')
    expect(vm.$el.querySelector('canvas')).not.to.be.an('undefined')
    expect(vm.$el.querySelector('canvas')).not.to.be.an('null')
    expect(vm.$el.querySelector('canvas')).to.exist
  })

  it('should change id based on prop', () => {
    const vm = new Vue({
      render: function (createElement) {
        return createElement(
          PolarChart, {
            props: {
              chartId: 'polarchartprop'
            }
          }
        )
      },
      components: { PolarChart }
    }).$mount(el)

    expect(vm.$el.querySelector('#polarchartprop')).not.to.be.an('undefined')
  })

  it('should destroy chart instance', (done) => {
    const vm = new Vue({
      render: function (createElement) {
        return createElement(
          PolarChart
        )
      },
      components: { PolarChart }
    }).$mount(el)

    expect(vm.$children[0]._chart.chart.ctx).not.to.be.null

    vm.$destroy()

    vm.$nextTick(() => {
      vm.$forceUpdate()
      expect(vm.$children[0]._chart.chart.ctx).to.be.null
      done()
    })
  })
})
