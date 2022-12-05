import {
  defineComponent,
  ref,
  shallowRef,
  h,
  onMounted,
  onBeforeUnmount,
  watch,
  toRaw
} from 'vue'
import { Chart as ChartJS } from 'chart.js'
import type { ChartComponent } from './types.js'
import { Props } from './props.js'
import {
  cloneData,
  setLabels,
  setDatasets,
  setOptions,
  toRawIfProxy,
  cloneProxy
} from './utils.js'

export const Chart = defineComponent({
  props: Props,
  setup(props, { expose }) {
    const canvasRef = ref<HTMLCanvasElement | null>(null)
    const chartRef = shallowRef<ChartJS | null>(null)

    expose({ chart: chartRef })

    const renderChart = () => {
      if (!canvasRef.value) return

      const { type, data, options, plugins, datasetIdKey } = props
      const clonedData = cloneData(data, datasetIdKey)
      const proxiedData = cloneProxy(clonedData, data)

      chartRef.value = new ChartJS(canvasRef.value, {
        type,
        data: proxiedData,
        options: { ...options },
        plugins
      })
    }

    const destroyChart = () => {
      const chart = toRaw(chartRef.value)

      if (chart) {
        chart.destroy()
        chartRef.value = null
      }
    }

    const update = (chart: ChartJS) => {
      chart.update()
    }

    onMounted(renderChart)

    onBeforeUnmount(destroyChart)

    watch(
      [() => props.options, () => props.data],
      (
        [nextOptionsProxy, nextDataProxy],
        [prevOptionsProxy, prevDataProxy]
      ) => {
        const chart = toRaw(chartRef.value)

        if (!chart) {
          return
        }

        let shouldUpdate = false

        if (nextOptionsProxy) {
          const nextOptions = toRawIfProxy(nextOptionsProxy)
          const prevOptions = toRawIfProxy(prevOptionsProxy)

          if (nextOptions && nextOptions !== prevOptions) {
            setOptions(chart, nextOptions)
            shouldUpdate = true
          }
        }

        if (nextDataProxy) {
          const nextLabels = toRawIfProxy(nextDataProxy.labels)
          const prevLabels = toRawIfProxy(prevDataProxy.labels)
          const nextDatasets = toRawIfProxy(nextDataProxy.datasets)
          const prevDatasets = toRawIfProxy(prevDataProxy.datasets)

          if (nextLabels !== prevLabels) {
            setLabels(chart.config.data, nextLabels)
            shouldUpdate = true
          }

          if (nextDatasets && nextDatasets !== prevDatasets) {
            setDatasets(chart.config.data, nextDatasets, props.datasetIdKey)
            shouldUpdate = true
          }
        }

        if (shouldUpdate) {
          update(chart)
        }
      },
      { deep: true }
    )

    return () => {
      return h('canvas', {
        ref: canvasRef
      })
    }
  }
}) as ChartComponent
