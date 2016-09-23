import Vue from 'vue'
import DoughnutChart from 'src/examples/DoughnutExample'

describe('DoughnutChart', () => {
  it('should render a canvas', () => {
    const vm = new Vue({
      el: 'body',
      replace: false,
      template: '<doughnut-chart></doughnut-chart>',
      components: { DoughnutChart }
    })
    expect(vm.$el.querySelector('#doughnut-chart')).not.to.be.an('undefined')
    expect(vm.$el.querySelector('canvas')).not.to.be.an('undefined')
    expect(vm.$el.querySelector('canvas')).not.to.be.an('null')
    expect(vm.$el.querySelector('canvas')).to.exist
  })
})
