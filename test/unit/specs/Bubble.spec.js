import Vue from 'vue'
import BubbleChart from 'src/examples/BubbleExample'

describe('BubbleChart', () => {
  let el

  beforeEach(() => {
    el = document.createElement('div')
  })

  it('should render a canvas', () => {
    const vm = new Vue({
      template: '<bubble-chart></bubble-chart>',
      components: { BubbleChart }
    }).$mount(el)

    expect(vm.$el.querySelector('#bubble-chart')).not.to.be.an('undefined')
    expect(vm.$el.querySelector('canvas')).not.to.be.an('undefined')
    expect(vm.$el.querySelector('canvas')).not.to.be.an('null')
    expect(vm.$el.querySelector('canvas')).to.exist
  })

  it('should change id based on prop', () => {
    const vm = new Vue({
      template: '<bubble-chart chartId="bubblechartprop"></bubble-chart>',
      components: { BubbleChart }
    }).$mount(el)

    expect(vm.$el.querySelector('#bubblechartprop')).not.to.be.an('undefined')
  })
})
