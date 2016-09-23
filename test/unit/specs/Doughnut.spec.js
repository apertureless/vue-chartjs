import Vue from 'vue'
import DoughnutChart from 'src/examples/DoughnutExample'

describe('DoughnutChart', () => {
  let el

  beforeEach(() => {
    el = document.createElement('div')
  })

  it('should render a canvas', () => {
    const vm = new Vue({
      template: '<doughnut-chart></doughnut-chart>',
      components: { DoughnutChart }
    }).$mount(el)

    expect(vm.$el.querySelector('#doughnut-chart')).not.to.be.an('undefined')
    expect(vm.$el.querySelector('canvas')).not.to.be.an('undefined')
    expect(vm.$el.querySelector('canvas')).not.to.be.an('null')
    expect(vm.$el.querySelector('canvas')).to.exist
  })

  it('should change id based on prop', () => {
    const vm = new Vue({
      template: '<doughnut-chart chartId="doughnutchartprop"></doughnut-chart>',
      components: { DoughnutChart }
    }).$mount(el)

    expect(vm.$el.querySelector('#doughnutchartprop')).not.to.be.an('undefined')
  })
})
