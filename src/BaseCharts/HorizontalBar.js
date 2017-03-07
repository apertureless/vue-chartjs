import Vue from 'vue'
import Chart from 'chart.js'
import { mergeOptions } from '../helpers/options'

export default Vue.extend({
  render: function (createElement) {
    return createElement(
      'div',
      [
        createElement(
          'canvas', {
            attrs: {
              id: this.chartId,
              width: this.width,
              height: this.height
            },
            ref: 'canvas'
          }
        )
      ]
    )
  },

  props: {
    chartId: {
      default: 'horizontalbar-chart',
      type: String
    },
    width: {
      default: 400,
      type: Number
    },
    height: {
      default: 400,
      type: Number
    }
  },

  data () {
    return {
      defaultOptions: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            },
            gridLines: {
              display: false
            }
          }],
          xAxes: [ {
            gridLines: {
              display: false
            },
            categoryPercentage: 0.5,
            barPercentage: 0.2
          }]
        }
      }
    }
  },

  methods: {
    renderChart (data, options, type) {
      let chartOptions = mergeOptions(this.defaultOptions, options)
      this._chart = new Chart(
        this.$refs.canvas.getContext('2d'), {
          type: 'horizontalBar',
          data: data,
          options: chartOptions
        }
      )
      this._chart.generateLegend()
    }
  },
  beforeDestroy () {
    this._chart.destroy()
  }
})
