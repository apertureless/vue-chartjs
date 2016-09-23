import Vue from 'vue'
import LineChart from 'src/examples/LineExample'

describe('LineChart', () => {
  it('should render a canvas', () => {
    const vm = new Vue({
      el: 'body',
      replace: false,
      template: '<line-chart></line-chart>',
      components: { LineChart }
    })
    expect(vm.$el.querySelector('#line-chart')).not.to.be.an('undefined')
    expect(vm.$el.querySelector('canvas')).not.to.be.an('undefined')
    expect(vm.$el.querySelector('canvas')).not.to.be.an('null')
    expect(vm.$el.querySelector('canvas')).to.exist
  })
})
