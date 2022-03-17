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

import type {
  ChartType,
  ChartComponentLike,
  DefaultDataPoint,
  PluginOptionsByType,
  ChartOptions
} from 'chart.js'

import {
  defineComponent,
  ref,
  shallowRef,
  h,
  onMounted,
  onBeforeUnmount,
  watch,
  isProxy,
  toRaw,
  PropType
} from 'vue'

import {
  chartCreate,
  chartDestroy,
  chartUpdate,
  getChartOptions,
  getChartData,
  setChartLabels,
  setChartDatasets,
  compareData
} from './utils'

import type {
  TChartData,
  TChartOptions,
  TypedChartJS,
  TypedChartComponent
} from './types'

export const generateChart = <
  TType extends ChartType = ChartType,
  TData = DefaultDataPoint<TType>,
  TLabel = unknown
>(
  chartId: string,
  chartType: TType,
  chartController: ChartComponentLike
): TypedChartComponent<TType, TData, TLabel> =>
  defineComponent({
    props: {
      chartData: {
        type: Object as PropType<TChartData<TType, TData, TLabel>>,
        required: true
      },
      chartOptions: {
        type: Object as PropType<TChartOptions<TType>>,
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
        type: Object as PropType<Partial<CSSStyleDeclaration>>,
        default: () => {}
      },
      plugins: {
        type: Object as PropType<PluginOptionsByType<TType>>,
        default: () => {}
      }
    },
    setup(props, context) {
      ChartJS.register(chartController)

      const _chart = shallowRef<TypedChartJS<TType, TData, TLabel> | null>(null)
      const canvasEl = ref<HTMLCanvasElement | null>(null)

      function renderChart(
        data: TChartData<TType, TData, TLabel>,
        options: TChartOptions<TType>
      ): void {
        if (_chart.value !== null) {
          chartDestroy<TType, TData, TLabel>(toRaw(_chart.value), context)
        }

        if (canvasEl.value === null) {
          throw new Error(
            'Please remove the <template></template> tags from your chart component. See https://vue-chartjs.org/guide/#vue-single-file-components'
          )
        } else {
          const chartData = getChartData<TType, TData, TLabel>(
            data,
            props.datasetIdKey
          )
          const canvasEl2DContext = canvasEl.value.getContext('2d')

          if (canvasEl2DContext !== null) {
            _chart.value = new ChartJS<TType, TData, TLabel>(
              canvasEl2DContext,
              {
                type: chartType,
                data: isProxy(data) ? new Proxy(chartData, {}) : chartData,
                options: getChartOptions<TType>(options, props.plugins)
              }
            )
          }
        }
      }

      function chartDataHandler(
        newValue: TChartData<TType, TData, TLabel>,
        oldValue: TChartData<TType, TData, TLabel>
      ): void {
        const newData = isProxy(newValue) ? toRaw(newValue) : { ...newValue }
        const oldData = isProxy(oldValue) ? toRaw(oldValue) : { ...oldValue }

        if (Object.keys(oldData).length > 0) {
          const chart = toRaw(_chart.value)

          const isEqualLabelsAndDatasetsLength = compareData<
            TType,
            TData,
            TLabel
          >(newData, oldData)

          if (isEqualLabelsAndDatasetsLength && chart !== null) {
            setChartDatasets<TType, TData, TLabel>(
              chart?.data,
              newData,
              props.datasetIdKey
            )

            if (newData.labels !== undefined) {
              setChartLabels<TType, TData, TLabel>(
                chart,
                newData.labels,
                context
              )
            }

            chartUpdate<TType, TData, TLabel>(chart, context)
          } else {
            if (chart !== null) {
              chartDestroy<TType, TData, TLabel>(chart, context)
            }

            chartCreate<TType, TData, TLabel>(
              renderChart,
              context,
              props.chartData,
              props.chartOptions as ChartOptions<TType>
            )
          }
        } else {
          if (_chart.value !== null) {
            chartDestroy<TType, TData, TLabel>(toRaw(_chart.value), context)
          }

          chartCreate<TType, TData, TLabel>(
            renderChart,
            context,
            props.chartData,
            props.chartOptions as ChartOptions<TType>
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
          chartCreate<TType, TData, TLabel>(
            renderChart,
            context,
            props.chartData,
            props.chartOptions as ChartOptions<TType>
          )
        }
      })

      onBeforeUnmount(() => {
        if (_chart.value !== null) {
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
  }) as any

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
