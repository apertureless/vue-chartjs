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
    xAxesScale: {
      type: Array,
      default: function () { return [{categoryPercentage: 0.5, barPercentage: 0.2, gridLines: { display: false }}] }
    },
    yAxesScale: {
      type: Array,
      default: function () { return [{ticks: {beginAtZero: true}, gridLines: { display: false }}] }
    }
  },

  data () {
    return {
      _chart: null,
      defaultOptions: {
        scales: {
          yAxes: this.yAxesScale,
          xAxes: this.xAxesScale
        }
      },
      plugins: []
    }
  },

  methods: {
    addPlugin (plugin) {
      this.plugins.push(plugin)
    },
    renderChart (data, options, type) {
      debugger
      let chartOptions = mergeOptions(this.defaultOptions, options)
      this.$data._chart = new Chart(
        this.$refs.canvas.getContext('2d'), {
          type: 'horizontalBar',
          data: data,
          options: chartOptions,
          plugins: this.plugins
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
