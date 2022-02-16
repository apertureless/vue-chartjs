import {
  Chart,
  ArcElement,
  BarElement,
  LineElement,
  BarController,
  PointElement,
  BubbleController,
  DoughnutController,
  LineController,
  PieController,
  PolarAreaController,
  RadarController,
  ScatterController,
  LinearScale,
  CategoryScale,
  RadialLinearScale,
  Title,
  Tooltip,
  Legend
} from 'chart.js'

export function generateChart(
  chartId,
  chartType,
  chartElements,
  chartController,
  chartScales,
  defaultOptions
) {
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
      Chart.register(
        ...chartElements,
        chartController,
        ...chartScales,
        Title,
        Tooltip,
        Legend
      )
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

        if (
          typeof defaultOptions !== 'undefined' &&
          defaultOptions.length > 0
        ) {
          for (const defaultOption of defaultOptions) {
            for (const defaultOptionKey of Object.keys(defaultOption)) {
              chartOptions[defaultOptionKey] = defaultOption[defaultOptionKey]
            }
          }
        }

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

export const Bar = generateChart(
  'bar-chart',
  'bar',
  [BarElement],
  BarController,
  [LinearScale, CategoryScale]
)

export const HorizontalBar = generateChart(
  'horizontalbar-chart',
  'bar',
  [BarElement],
  BarController,
  [CategoryScale],
  [{ indexAxis: 'y' }]
)

export const Doughnut = generateChart(
  'doughnut-chart',
  'doughnut',
  [ArcElement],
  DoughnutController,
  [CategoryScale]
)

export const Line = generateChart(
  'line-chart',
  'line',
  [LineElement],
  LineController,
  [LinearScale]
)

export const Pie = generateChart(
  'pie-chart',
  'pie',
  [ArcElement],
  PieController,
  [CategoryScale]
)

export const PolarArea = generateChart(
  'polar-chart',
  'polarArea',
  [ArcElement],
  PolarAreaController,
  [RadialLinearScale]
)

export const Radar = generateChart(
  'radar-chart',
  'radar',
  [PointElement],
  RadarController,
  [RadialLinearScale]
)

export const Bubble = generateChart(
  'bubble-chart',
  'bubble',
  [PointElement],
  BubbleController,
  [LinearScale]
)

export const Scatter = generateChart(
  'scatter-chart',
  'scatter',
  [LineElement],
  ScatterController,
  [CategoryScale]
)

export default {
  Bar,
  HorizontalBar,
  Doughnut,
  Line,
  Pie,
  PolarArea,
  Radar,
  Bubble,
  Scatter
}
