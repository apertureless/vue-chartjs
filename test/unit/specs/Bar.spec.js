import Vue from 'vue'
import BarChart from 'src/examples/BarExample'

describe('BarChart', () => {
  it('should render a canvas', () => {
    const vm = new Vue({
      el: 'body',
      replace: false,
      template: '<bar-chart></bar-chart>',
      components: { BarChart }
    })
    expect(vm.$el.querySelector('#bar-chart')).not.to.be.an('undefined')
    expect(vm.$el.querySelector('canvas')).not.to.be.an('undefined')
    expect(vm.$el.querySelector('canvas')).not.to.be.an('null')
    expect(vm.$el.querySelector('canvas')).to.exist
  })
})
