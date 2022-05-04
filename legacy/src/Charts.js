import {
  Chart as ChartJS,
  BarController,
  BubbleController,
  DoughnutController,
  LineController,
  PieController,
  PolarAreaController,
  RadarController,
  ScatterController
} from 'chart.js'

import {
  chartCreate,
  chartDestroy,
  chartUpdate,
  getChartData,
  setChartLabels,
  setChartDatasets,
  compareData,
  templateError,
  ChartEmits,
  setChartOptions
} from '../../src/utils'

const ANNOTATION_PLUGIN_KEY = 'annotation'

export function generateChart(chartId, chartType, chartController) {
  let _chartRef = null

  return {
    props: {
      chartData: {
        type: Object,
        required: true
      },
      chartOptions: {
        type: Object,
        default: () => {}
      },
      datasetIdKey: {
        type: String,
        default: 'label'
      },
      chartId: {
        type: String,
        default: chartId
      },
      width: {
        type: Number,
        default: 400
      },
      height: {
        type: Number,
        default: 400
      },
      cssClasses: {
        type: String,
        default: ''
      },
      styles: {
        type: Object,
        default: () => {}
      },
      plugins: {
        type: Array,
        default: () => []
      }
    },
    data() {
      return {
        _chart: null
      }
    },
    computed: {
      hasAnnotationPlugin() {
        const pluginSettings =
          this.chartOptions?.plugins?.[ANNOTATION_PLUGIN_KEY]

        return typeof pluginSettings !== 'undefined'
      }
    },
    created() {
      ChartJS.register(chartController)
    },
    mounted() {
      _chartRef = { current: null }

      if ('datasets' in this.chartData && this.chartData.datasets.length > 0) {
        chartCreate(this.renderChart, this.chartData, this.chartOptions)
        this.$emit(ChartEmits.ChartRendered)
      }
    },
    watch: {
      chartData: {
        handler: function (newValue, oldValue) {
          this.chartDataHandler(newValue, oldValue)
        },
        deep: true
      },
      chartOptions: {
        handler: function (newValue) {
          this.chartOptionsHandler(newValue)
        },
        deep: true
      }
    },
    methods: {
      renderChart(data, options) {
        const currentChart = this.getCurrentChart()

        if (currentChart !== null) {
          chartDestroy(currentChart)
          this.$emit(ChartEmits.ChartDestroyed)
        }

        if (!this.$refs.canvas) {
          throw new Error(templateError)
        } else {
          const chartData = getChartData(data, this.datasetIdKey)

          const canvasEl2DContext = this.$refs.canvas.getContext('2d')

          if (canvasEl2DContext !== null) {
            this.setCurrentChart(
              new ChartJS(canvasEl2DContext, {
                type: chartType,
                data: chartData,
                options,
                plugins: this.plugins
              })
            )
          }
        }
      },
      chartDataHandler(newValue, oldValue) {
        const newData = { ...newValue }
        const oldData = { ...oldValue }
        const currentChart = this.getCurrentChart()

        if (Object.keys(oldData).length > 0) {
          const isEqualLabelsAndDatasetsLength = compareData(newData, oldData)

          if (isEqualLabelsAndDatasetsLength && currentChart !== null) {
            setChartDatasets(currentChart.data, newData, this.datasetIdKey)

            if (newData.labels !== undefined) {
              setChartLabels(currentChart, newData.labels)
              this.$emit(ChartEmits.LabelsUpdated)
            }

            this.updateChart()
            this.$emit(ChartEmits.ChartUpdated)
          } else {
            if (currentChart !== null) {
              chartDestroy(currentChart)
              this.$emit(ChartEmits.ChartDestroyed)
            }

            chartCreate(this.renderChart, this.chartData, this.chartOptions)
            this.$emit(ChartEmits.ChartRendered)
          }
        } else {
          if (currentChart !== null) {
            chartDestroy(currentChart)
            this.$emit(ChartEmits.ChartDestroyed)
          }

          chartCreate(this.renderChart, this.chartData, this.chartOptions)
          this.$emit(ChartEmits.ChartRendered)
        }
      },
      chartOptionsHandler(options) {
        const currentChart = this.getCurrentChart()

        if (currentChart !== null) {
          setChartOptions(currentChart, options)
          this.updateChart()
        } else {
          chartCreate(this.renderChart, this.chartData, this.chartOptions)
        }
      },
      updateChart() {
        const currentChart = this.getCurrentChart()
        chartUpdate(currentChart)
      },
      getCurrentChart() {
        return this.hasAnnotationPlugin ? _chartRef.current : this.$data._chart
      },
      setCurrentChart(chart) {
        this.hasAnnotationPlugin
          ? (_chartRef.current = chart)
          : (this.$data._chart = chart)
      }
    },
    beforeDestroy() {
      const currentChart = this.getCurrentChart()

      if (currentChart !== null) {
        chartDestroy(currentChart)
        this.$emit(ChartEmits.ChartDestroyed)
      }
    },
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
  Bubble,
  Doughnut,
  Line,
  Pie,
  PolarArea,
  Radar,
  Scatter,
  generateChart
}
