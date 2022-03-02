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
  isProxy,
  toRaw
} from 'vue'

export const generateChart = (chartId, chartType, chartController) =>
  defineComponent({
    props: {
      chartData: {
        type: Object,
        required: true
      },
      chartOptions: {
        type: Object,
        default: () => {}
      },
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

      function renderChart(data, options) {
        if (_chart.value !== null) {
          toRaw(_chart.value).destroy()
        }

        if (canvasEl.value === null) {
          throw new Error(
            'Please remove the <template></template> tags from your chart component. See https://vue-chartjs.org/guide/#vue-single-file-components'
          )
        }

        const chartOptions = options

        if (
          typeof props.plugins !== 'undefined' &&
          Object.keys(props.plugins).length > 0
        ) {
          chartOptions.plugins = { ...chartOptions.plugins, ...props.plugins }
        }

        _chart.value = new ChartJS(canvasEl.value.getContext('2d'), {
          type: chartType,
          data: data,
          options: chartOptions
        })
      }

      function chartDataHandler(newValue, oldValue) {
        const newData = isProxy(newValue) ? toRaw(newValue) : { ...newValue }
        const oldData = isProxy(oldValue) ? toRaw(oldValue) : { ...oldValue }

        if (Object.keys(oldData).length > 0) {
          const chart = toRaw(_chart.value)

          // Get new and old DataSet Labels
          const newDatasetLabels = newData.datasets.map(dataset => {
            return dataset.label
          })

          const oldDatasetLabels = oldData.datasets.map(dataset => {
            return dataset.label
          })

          // Stringify 'em for easier compare
          const oldLabels = JSON.stringify(oldDatasetLabels)
          const newLabels = JSON.stringify(newDatasetLabels)

          // Check if Labels are equal and if dataset length is equal
          if (
            newLabels === oldLabels &&
            oldData.datasets.length === newData.datasets.length
          ) {
            for (const [i, dataset] of newData.datasets.entries()) {
              // Get new and old dataset keys
              const oldDatasetKeys = Object.keys(oldData.datasets[i])
              const newDatasetKeys = Object.keys(dataset)

              // Get keys that aren't present in the new data
              const deletionKeys = oldDatasetKeys.filter(key => {
                return key !== '_meta' && newDatasetKeys.indexOf(key) === -1
              })

              for (const deletionKey of deletionKeys) {
                delete chart.data.datasets[i][deletionKey]
              }

              // Update attributes individually to avoid re-rendering the entire chart
              for (const attribute in dataset) {
                if (Object.prototype.hasOwnProperty.call(dataset, attribute)) {
                  chart.data.datasets[i][attribute] = dataset[attribute]
                }
              }
            }

            if (Object.prototype.hasOwnProperty.call(newData, 'labels')) {
              chart.data.labels = newData.labels
              context.emit('labels:update')
            }

            if (Object.prototype.hasOwnProperty.call(newData, 'xLabels')) {
              chart.data.xLabels = newData.xLabels
              context.emit('xlabels:update')
            }

            if (Object.prototype.hasOwnProperty.call(newData, 'yLabels')) {
              chart.data.yLabels = newData.yLabels
              context.emit('ylabels:update')
            }

            chart.update()
            context.emit('chart:update')
          } else {
            if (chart !== null) {
              chart.destroy()
              context.emit('chart:destroy')
            }

            renderChart(props.chartData, props.options)
            context.emit('chart:render')
          }
        } else {
          if (_chart.value !== null) {
            toRaw(_chart.value).destroy()
            context.emit('chart:destroy')
          }

          renderChart(props.chartData, props.options)
          context.emit('chart:render')
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
          renderChart(props.chartData, props.chartOptions)
        }
      })

      onBeforeUnmount(() => {
        if (_chart.value !== null) {
          toRaw(_chart.value).destroy()
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
