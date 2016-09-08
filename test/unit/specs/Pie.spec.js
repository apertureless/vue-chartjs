import Vue from 'vue'
import PieChart from 'src/examples/PieExample'

describe('PieChart', () => {
  it('should render a canvas', () => {
    const vm = new Vue({
      el: 'body',
      replace: false,
      template: '<pie-chart></pie-chart>',
      components: { PieChart }
    })
    expect(vm.$el.querySelector('#pie-chart')).not.to.be.an('undefined')
    expect(vm.$el.querySelector('canvas')).not.to.be.an('undefined')
    expect(vm.$el.querySelector('canvas')).not.to.be.an('null')
    expect(vm.$el.querySelector('canvas')).to.exist
  })
})
