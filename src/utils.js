export function chartCreate(
  createChartFunction,
  createChartFunctionArgs,
  context
) {
  createChartFunction(...createChartFunctionArgs)
  context.emit('chart:rendered')
}

export function chartUpdate(chart, context) {
  chart.update()
  context.emit('chart:updated')
}

export function chartDestroy(chart, context) {
  chart.destroy()
  context.emit('chart:destroyed')
}

export function getChartData(data, datasetIdKey) {
  const nextData = {
    labels: typeof data.labels === 'undefined' ? [] : [...data.labels],
    datasets: []
  }

  setChartDatasets(nextData, { ...data }, datasetIdKey)
  return nextData
}

export function getChartOptions(options, plugins) {
  const chartOptions = options

  if (typeof plugins !== 'undefined' && Object.keys(plugins).length > 0) {
    chartOptions.plugins = { ...chartOptions.plugins, ...plugins }
  }

  return chartOptions
}

export function setChartDatasets(oldData, newData, datasetIdKey) {
  const addedDatasets = []

  oldData.datasets = newData.datasets.map(nextDataset => {
    // given the new set, find it's current match
    const currentDataset = oldData.datasets.find(
      dataset => dataset[datasetIdKey] === nextDataset[datasetIdKey]
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
  })
}

export function setChartLabels(chart, labels, context) {
  chart.data.labels = labels
  context.emit('labels:updated')
}

export function setChartXLabels(chart, xLabels, context) {
  chart.data.xLabels = xLabels
  context.emit('xlabels:updated')
}

export function setChartYLabels(chart, yLabels, context) {
  chart.data.yLabels = yLabels
  context.emit('ylabels:updated')
}

export function compareData(newData, oldData) {
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
