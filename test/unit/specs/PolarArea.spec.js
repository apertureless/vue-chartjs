import Vue from 'vue'
import PolarChart from 'src/examples/PolarAreaExample'

describe('PolarChart', () => {
  it('should render a canvas', () => {
    const vm = new Vue({
      el: 'body',
      replace: false,
      template: '<polar-chart></polar-chart>',
      components: { PolarChart }
    })
    expect(vm.$el.querySelector('#polar-chart')).not.to.be.an('undefined')
    expect(vm.$el.querySelector('canvas')).not.to.be.an('undefined')
    expect(vm.$el.querySelector('canvas')).not.to.be.an('null')
    expect(vm.$el.querySelector('canvas')).to.exist
  })
})
