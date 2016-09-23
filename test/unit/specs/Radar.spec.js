import Vue from 'vue'
import RadarChart from 'src/examples/RadarExample'

describe('RadarChart', () => {
  it('should render a canvas', () => {
    const vm = new Vue({
      el: 'body',
      replace: false,
      template: '<radar-chart></radar-chart>',
      components: { RadarChart }
    })
    expect(vm.$el.querySelector('#radar-chart')).not.to.be.an('undefined')
    expect(vm.$el.querySelector('canvas')).not.to.be.an('undefined')
    expect(vm.$el.querySelector('canvas')).not.to.be.an('null')
    expect(vm.$el.querySelector('canvas')).to.exist
  })
})
