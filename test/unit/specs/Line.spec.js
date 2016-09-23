import Vue from 'vue'
import LineChart from 'src/examples/LineExample'

describe('LineChart', () => {
  let el

  beforeEach(() => {
    el = document.createElement('div')
  })

  it('should render a canvas', () => {
    const vm = new Vue({
      template: '<line-chart></line-chart>',
      components: { LineChart }
    }).$mount(el)

    expect(vm.$el.querySelector('#line-chart')).not.to.be.an('undefined')
    expect(vm.$el.querySelector('canvas')).not.to.be.an('undefined')
    expect(vm.$el.querySelector('canvas')).not.to.be.an('null')
    expect(vm.$el.querySelector('canvas')).to.exist
  })

  it('should change id based on prop', () => {
    const vm = new Vue({
      template: '<line-chart chartId="linechartprop"></line-chart>',
      components: { LineChart }
    }).$mount(el)

    expect(vm.$el.querySelector('#linechartprop')).not.to.be.an('undefined')
  })
})
