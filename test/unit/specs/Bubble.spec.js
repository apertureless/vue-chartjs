import Vue from 'vue'
import BubbleChart from 'src/examples/BubbleExample'

describe('BubbleChart', () => {
  it('should render a canvas', () => {
    const vm = new Vue({
      el: 'body',
      replace: false,
      template: '<bubble-chart></bubble-chart>',
      components: { BubbleChart }
    })
    expect(vm.$el.querySelector('#bubble-chart')).not.to.be.an('undefined')
    expect(vm.$el.querySelector('canvas')).not.to.be.an('undefined')
    expect(vm.$el.querySelector('canvas')).not.to.be.an('null')
    expect(vm.$el.querySelector('canvas')).to.exist
  })
})
