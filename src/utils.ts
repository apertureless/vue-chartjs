import { isProxy, toRaw, version } from 'vue'
import type {
  Chart,
  ChartType,
  ChartData,
  ChartDataset,
  ChartOptions,
  DefaultDataPoint
} from 'chart.js'

export const compatProps =
  version[0] === '2'
    ? <I extends {}, T extends {}>(internals: I, props: T) =>
        Object.assign(internals, { attrs: props }) as unknown as I & T
    : <I extends {}, T extends {}>(internals: I, props: T) =>
        Object.assign(internals, props)

export function toRawIfProxy<T>(obj: T) {
  return isProxy(obj) ? toRaw(obj) : obj
}

function isPlainObject(value: unknown): value is Record<string, unknown> {
  if (value === null || typeof value !== 'object') {
    return false
  }

  const proto = Object.getPrototypeOf(value)
  return proto === Object.prototype || proto === null
}

/**
 * Clone chart data into plain objects/arrays so Chart.js never instruments
 * Vue reactive collections (that pairing recurses in `listenArrayEvents`).
 */
function cloneForChart<T>(value: T): T {
  const raw = toRawIfProxy(value)

  if (Array.isArray(raw)) {
    return raw.map(item => cloneForChart(item)) as T
  }

  if (isPlainObject(raw)) {
    const result: Record<string, unknown> = {}

    for (const key of Object.keys(raw)) {
      result[key] = cloneForChart(raw[key])
    }

    return result as T
  }

  return raw
}

export function cloneProxy<T extends object>(obj: T, src = obj) {
  return isProxy(src) ? new Proxy(obj, {}) : obj
}

export function setOptions<
  TType extends ChartType = ChartType,
  TData = DefaultDataPoint<TType>,
  TLabel = unknown
>(chart: Chart<TType, TData, TLabel>, nextOptions: ChartOptions<TType>) {
  const options = chart.options

  if (options && nextOptions) {
    Object.assign(options, nextOptions)
  }
}

export function setLabels<
  TType extends ChartType = ChartType,
  TData = DefaultDataPoint<TType>,
  TLabel = unknown
>(
  currentData: ChartData<TType, TData, TLabel>,
  nextLabels: TLabel[] | undefined
) {
  currentData.labels = cloneForChart(nextLabels)
}

export function setDatasets<
  TType extends ChartType = ChartType,
  TData = DefaultDataPoint<TType>,
  TLabel = unknown
>(
  currentData: ChartData<TType, TData, TLabel>,
  nextDatasets: ChartDataset<TType, TData>[],
  datasetIdKey: string
) {
  const addedDatasets: ChartDataset<TType, TData>[] = []

  currentData.datasets = nextDatasets.map(
    (nextDataset: Record<string, unknown>) => {
      const clonedNext = cloneForChart(nextDataset)

      // given the new set, find it's current match
      const currentDataset = currentData.datasets.find(
        (dataset: Record<string, unknown>) =>
          dataset[datasetIdKey] === clonedNext[datasetIdKey]
      )

      // There is no original to update, so simply add new one
      if (
        !currentDataset ||
        !clonedNext.data ||
        addedDatasets.includes(currentDataset)
      ) {
        return { ...clonedNext } as ChartDataset<TType, TData>
      }

      addedDatasets.push(currentDataset)

      Object.assign(currentDataset, clonedNext)

      return currentDataset
    }
  )
}

export function cloneData<
  TType extends ChartType = ChartType,
  TData = DefaultDataPoint<TType>,
  TLabel = unknown
>(data: ChartData<TType, TData, TLabel>, datasetIdKey: string) {
  const nextData: ChartData<TType, TData, TLabel> = {
    labels: [],
    datasets: []
  }

  setLabels(nextData, data.labels)
  setDatasets(nextData, data.datasets, datasetIdKey)

  return nextData
}

/**
 * Get dataset from mouse click event
 * @param chart - Chart.js instance
 * @param event - Mouse click event
 * @returns Dataset
 */
export function getDatasetAtEvent(chart: Chart, event: MouseEvent) {
  return chart.getElementsAtEventForMode(
    event,
    'dataset',
    { intersect: true },
    false
  )
}

/**
 * Get single dataset element from mouse click event
 * @param chart - Chart.js instance
 * @param event - Mouse click event
 * @returns Dataset
 */
export function getElementAtEvent(chart: Chart, event: MouseEvent) {
  return chart.getElementsAtEventForMode(
    event,
    'nearest',
    { intersect: true },
    false
  )
}

/**
 * Get all dataset elements from mouse click event
 * @param chart - Chart.js instance
 * @param event - Mouse click event
 * @returns Dataset
 */
export function getElementsAtEvent(chart: Chart, event: MouseEvent) {
  return chart.getElementsAtEventForMode(
    event,
    'index',
    { intersect: true },
    false
  )
}
