import {
  Chart,
  BarController,
  BubbleController,
  DoughnutController,
  LineController,
  PieController,
  PolarAreaController,
  RadarController,
  ScatterController
} from 'chart.js'

export function generateChart(chartId, chartType, chartController) {
  return {
    render: function (createElement) {
      return createElement(
        'div',
        {
          style: this.styles,
          class: this.cssClasses
        },
        [
          createElement('canvas', {
            attrs: {
              id: this.chartId,
              width: this.width,
              height: this.height
            },
            ref: 'canvas'
          })
        ]
      )
    },

    props: {
      chartId: {
        default: chartId,
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
        default() {
          return []
        }
      }
    },
    data() {
      return {
        _chart: null
      }
    },
    created() {
      Chart.register(chartController)
    },
    methods: {
      renderChart(data, options) {
        if (this.$data._chart) {
          this.$data._chart.destroy()
        }

        if (!this.$refs.canvas) {
          throw new Error(
            'Please remove the <template></template> tags from your chart component. See https://vue-chartjs.org/guide/#vue-single-file-components'
          )
        }

        const chartOptions = options

        if (this.plugins.length > 0) {
          for (const plugin of this.plugins) {
            chartOptions['plugins'] = { ...chartOptions.plugins, ...plugin }
          }
        }

        this.$data._chart = new Chart(this.$refs.canvas.getContext('2d'), {
          type: chartType,
          data: data,
          options: chartOptions
        })
      }
    },
    beforeDestroy() {
      if (this.$data._chart) {
        this.$data._chart.destroy()
      }
    }
  }
}

export const Bar = /* #__PURE__ */ generateChart(
  'bar-chart',
  'bar',
  BarController
)

export const Doughnut = /* #__PURE__ */ generateChart(
  'doughnut-chart',
  'doughnut',
  DoughnutController
)

export const Line = /* #__PURE__ */ generateChart(
  'line-chart',
  'line',
  LineController
)

export const Pie = /* #__PURE__ */ generateChart(
  'pie-chart',
  'pie',
  PieController
)

export const PolarArea = /* #__PURE__ */ generateChart(
  'polar-chart',
  'polarArea',
  PolarAreaController
)

export const Radar = /* #__PURE__ */ generateChart(
  'radar-chart',
  'radar',
  RadarController
)

export const Bubble = /* #__PURE__ */ generateChart(
  'bubble-chart',
  'bubble',
  BubbleController
)

export const Scatter = /* #__PURE__ */ generateChart(
  'scatter-chart',
  'scatter',
  ScatterController
)

export default {
  Bar,
  Doughnut,
  Line,
  Pie,
  PolarArea,
  Radar,
  Bubble,
  Scatter
}
