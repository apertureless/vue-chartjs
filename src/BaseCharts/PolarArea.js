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
      default: 'polar-chart',
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
    }
  },

  data () {
    return {
      _chart: null,
      defaultOptions: {
      },
      plugins: []
    }
  },

  methods: {
    addPlugin (plugin) {
      this.plugins.push(plugin)
    },
    renderChart (data, options) {
      let chartOptions = mergeOptions(this.defaultOptions, options)

      this.$data._chart = new Chart(
        this.$refs.canvas.getContext('2d'), {
          type: 'polarArea',
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
