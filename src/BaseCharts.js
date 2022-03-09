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
  defineComponent,
  ref,
  h,
  onMounted,
  onBeforeUnmount,
  watch,
  computed,
  isProxy,
  toRaw
} from 'vue'

import {
  chartCreate,
  chartDestroy,
  chartUpdate,
  getChartOptions,
  getChartData,
  setChartLabels,
  setChartXLabels,
  setChartYLabels,
  setChartDatasets,
  compareData
} from './utils.js'

export const generateChart = (chartId, chartType, chartController) =>
  defineComponent({
    props: {
      chartData: {
        type: Object,
        required: true
      },
      datasetIdKey: {
        type: String,
        default: 'label'
      },
      chartOptions: {
        type: Object,
        default: () => {}
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
        type: Object,
        default: () => {}
      }
    },
    setup(props, context) {
      ChartJS.register(chartController)

      const _chart = ref(null)
      const canvasEl = ref(null)

      const hasChart = computed(() => _chart.value !== null)

      function renderChart(data, options) {
        if (hasChart.value) {
          chartDestroy(toRaw(_chart.value), context)
        }

        if (canvasEl.value === null) {
          throw new Error(
            'Please remove the <template></template> tags from your chart component. See https://vue-chartjs.org/guide/#vue-single-file-components'
          )
        }

        const chartData = getChartData(data)

        _chart.value = new ChartJS(canvasEl.value.getContext('2d'), {
          type: chartType,
          data: isProxy(data) ? new Proxy(chartData, {}) : chartData,
          options: getChartOptions(options, props.plugins)
        })
      }

      function chartDataHandler(newValue, oldValue) {
        const newData = isProxy(newValue) ? toRaw(newValue) : { ...newValue }
        const oldData = isProxy(oldValue) ? toRaw(oldValue) : { ...oldValue }

        if (Object.keys(oldData).length > 0) {
          const chart = toRaw(_chart.value)

          const isEqualLabelsAndDatasetsLength = compareData(newData, oldData)

          if (isEqualLabelsAndDatasetsLength) {
            setChartDatasets(chart.data, newData, props.datasetIdKey)

            if (Object.prototype.hasOwnProperty.call(newData, 'labels')) {
              setChartLabels(chart, newData.labels, context)
            }

            if (Object.prototype.hasOwnProperty.call(newData, 'xLabels')) {
              setChartXLabels(chart, newData.xLabels, context)
            }

            if (Object.prototype.hasOwnProperty.call(newData, 'yLabels')) {
              setChartYLabels(chart, newData.yLabels, context)
            }

            chartUpdate(chart, context)
          } else {
            if (hasChart.value) {
              chartDestroy(chart, context)
            }

            chartCreate(
              renderChart,
              [props.chartData, props.chartOptions],
              context
            )
          }
        } else {
          if (hasChart.value) {
            chartDestroy(toRaw(_chart.value), context)
          }

          chartCreate(
            renderChart,
            [props.chartData, props.chartOptions],
            context
          )
        }
      }

      watch(
        () => props.chartData,
        (newValue, oldValue) => chartDataHandler(newValue, oldValue),
        { deep: true }
      )

      onMounted(() => {
        if (
          'datasets' in props.chartData &&
          props.chartData.datasets.length > 0
        ) {
          chartCreate(
            renderChart,
            [props.chartData, props.chartOptions],
            context
          )
        }
      })

      onBeforeUnmount(() => {
        if (hasChart.value) {
          chartDestroy(toRaw(_chart.value), context)
        }
      })

      return () =>
        h('div', { style: props.styles, class: props.cssClasses }, [
          h('canvas', {
            id: props.chartId,
            width: props.width,
            height: props.height,
            ref: canvasEl
          })
        ])
    }
  })

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
