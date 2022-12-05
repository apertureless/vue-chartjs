import { isProxy, toRaw } from 'vue'
import type {
  Chart,
  ChartType,
  ChartData,
  ChartDataset,
  ChartOptions,
  DefaultDataPoint
} from 'chart.js'

export function toRawIfProxy<T>(obj: T) {
  return isProxy(obj) ? toRaw(obj) : obj
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
  currentData.labels = nextLabels
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
      // given the new set, find it's current match
      const currentDataset = currentData.datasets.find(
        (dataset: Record<string, unknown>) =>
          dataset[datasetIdKey] === nextDataset[datasetIdKey]
      )

      // There is no original to update, so simply add new one
      if (
        !currentDataset ||
        !nextDataset.data ||
        addedDatasets.includes(currentDataset)
      ) {
        return { ...nextDataset } as ChartDataset<TType, TData>
      }

      addedDatasets.push(currentDataset)

      Object.assign(currentDataset, nextDataset)

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
