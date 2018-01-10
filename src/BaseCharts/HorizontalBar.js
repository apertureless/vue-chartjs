import Chart from 'chart.js'
import { mergeOptions } from '../helpers/options'

export default {
  render: function (createElement) {
    return createElement(
      'div', {
        style: this.styles,
        class: this.cssClasses
      },
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
    },
    cssClasses: {
      type: String,
      default: ''
    },
    styles: {
      type: Object
    },
    plugins: {
      type: Array,
      default () {
        return []
      }
    }
  },

  data () {
    return {
      _chart: null,
      defaultOptions: {
        scales: {
          yAxes: [{
            gridLines: {
              display: false
            },
            categoryPercentage: 0.8,
            barPercentage: 0.9
          }],
          xAxes: [{
            ticks: {
              beginAtZero: true
            },
            gridLines: {
              display: false
            }
          }]
        }
      },
      _plugins: this.plugins
    }
  },

  methods: {
    addPlugin (plugin) {
      this.$data._plugins.push(plugin)
    },
    renderChart (data, options, type) {
      let chartOptions = mergeOptions(this.defaultOptions, options)
      this.$data._chart = new Chart(
        this.$refs.canvas.getContext('2d'), {
          type: 'horizontalBar',
          data: data,
          options: chartOptions,
          plugins: this.$data._plugins
        }
      )
    }
  },
  beforeDestroy () {
    if (this.$data._chart) {
      this.$data._chart.destroy()
    }
  }
}
