import Vue from 'vue'
import RadarChart from 'src/examples/RadarExample'

describe('RadarChart', () => {
  let el

  beforeEach(() => {
    el = document.createElement('div')
  })

  it('should render a canvas', () => {
    const vm = new Vue({
      render: function (createElement) {
        return createElement(
          RadarChart
        )
      },
      components: { RadarChart }
    }).$mount(el)

    expect(vm.$el.querySelector('#radar-chart')).not.to.be.an('undefined')
    expect(vm.$el.querySelector('canvas')).not.to.be.an('undefined')
    expect(vm.$el.querySelector('canvas')).not.to.be.an('null')
    expect(vm.$el.querySelector('canvas')).to.exist
  })

  it('should change id based on prop', () => {
    const vm = new Vue({
      render: function (createElement) {
        return createElement(
          RadarChart, {
            props: {
              chartId: 'rodarchartprop'
            }
          }
        )
      },
      components: { RadarChart }
    }).$mount(el)

    expect(vm.$el.querySelector('#rodarchartprop')).not.to.be.an('undefined')
  })
})
