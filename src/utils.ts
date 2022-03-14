import type {
  ChartType,
  ChartDataset,
  DefaultDataPoint,
  PluginOptionsByType
} from 'chart.js'

import type { TChartData, TChartOptions, TypedChartJS } from './types'

import { SetupContext } from 'vue'

export enum ChartEmits {
  ChartRendered = 'chart:rendered',
  ChartUpdated = 'chart:updated',
  ChartDestroyed = 'chart:destroyed',
  LabelsUpdated = 'labels:updated'
}

export function chartCreate<
  TType extends ChartType = ChartType,
  TData = DefaultDataPoint<TType>,
  TLabel = unknown
>(
  createChartFunction: (
    data: TChartData<TType, TData, TLabel>,
    options: TChartOptions<TType>
  ) => void,
  context: SetupContext,
  chartData: TChartData<TType, TData, TLabel>,
  chartOptions: TChartOptions<TType>
): void {
  createChartFunction(chartData, chartOptions)
  context.emit(ChartEmits.ChartRendered)
}

export function chartUpdate<
  TType extends ChartType,
  TData = DefaultDataPoint<TType>,
  TLabel = unknown
>(chart: TypedChartJS<TType, TData, TLabel>, context: SetupContext): void {
  chart.update()
  context.emit(ChartEmits.ChartUpdated)
}

export function chartDestroy<
  TType extends ChartType,
  TData = DefaultDataPoint<TType>,
  TLabel = unknown
>(chart: TypedChartJS<TType, TData, TLabel>, context: SetupContext): void {
  chart.destroy()
  context.emit(ChartEmits.ChartDestroyed)
}

export function getChartData<
  TType extends ChartType = ChartType,
  TData = DefaultDataPoint<TType>,
  TLabel = unknown
>(
  data: TChartData<TType, TData, TLabel>,
  datasetIdKey: string
): TChartData<TType, TData, TLabel> {
  const nextData = {
    labels: typeof data.labels === 'undefined' ? [] : [...data.labels],
    datasets: []
  }

  setChartDatasets(nextData, { ...data }, datasetIdKey)
  return nextData
}

export function getChartOptions<TType extends ChartType = ChartType>(
  options?: TChartOptions<TType>,
  plugins?: PluginOptionsByType<TType>
): TChartOptions<TType> | undefined {
  const chartOptions = options

  if (
    chartOptions !== undefined &&
    'plugins' in chartOptions &&
    typeof plugins !== 'undefined' &&
    Object.keys(plugins).length > 0
  ) {
    chartOptions.plugins = {
      ...chartOptions.plugins,
      ...plugins
    }
  }

  return chartOptions
}

export function setChartDatasets<
  TType extends ChartType = ChartType,
  TData = DefaultDataPoint<TType>,
  TLabel = unknown
>(
  oldData: TChartData<TType, TData, TLabel>,
  newData: TChartData<TType, TData, TLabel>,
  datasetIdKey: string
): void {
  const addedDatasets: ChartDataset<TType, TData>[] = []

  oldData.datasets = newData.datasets.map(
    (nextDataset: Record<string, unknown>) => {
      // given the new set, find it's current match
      const currentDataset = oldData.datasets.find(
        (dataset: Record<string, unknown>) =>
          dataset[datasetIdKey] === nextDataset[datasetIdKey]
      )

      // There is no original to update, so simply add new one
      if (
        !currentDataset ||
        !nextDataset.data ||
        addedDatasets.includes(currentDataset)
      ) {
        return { ...nextDataset }
      }

      addedDatasets.push(currentDataset)

      Object.assign(currentDataset, nextDataset)

      return currentDataset
    }
  ) as ChartDataset<TType, TData>[]
}

export function setChartLabels<
  TType extends ChartType,
  TData = DefaultDataPoint<TType>,
  TLabel = unknown
>(
  chart: TypedChartJS<TType, TData, TLabel>,
  labels: TLabel[] | undefined,
  context: SetupContext
): void {
  chart.data.labels = labels
  context.emit(ChartEmits.LabelsUpdated)
}

export function compareData<
  TType extends ChartType = ChartType,
  TData = DefaultDataPoint<TType>,
  TLabel = unknown
>(
  newData: TChartData<TType, TData, TLabel>,
  oldData: TChartData<TType, TData, TLabel>
): boolean {
  // Get new and old DataSet Labels
  const newDatasetLabels = newData.datasets.map(dataset => {
    return dataset.label
  })

  const oldDatasetLabels = oldData.datasets.map(dataset => {
    return dataset.label
  })

  // Check if Labels are equal and if dataset length is equal
  return (
    oldData.datasets.length === newData.datasets.length &&
    newDatasetLabels.every((value, index) => value === oldDatasetLabels[index])
  )
}
