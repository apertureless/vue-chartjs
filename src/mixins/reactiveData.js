module.exports = {
  data () {
    return {
      chartData: null
    }
  },
  watch: {
    'chartData': {
      handler (newData, oldData) {
        if (oldData) {
          let chart = this._chart

          // Get new and old DataSet Labels
          let newDatasetLabels = newData.datasets.map((dataset) => {
            return dataset.label
          })

          let oldDatasetLabels = oldData.datasets.map((dataset) => {
            return dataset.label
          })

          // Stringify 'em for easier compare
          const oldLabels = JSON.stringify(oldDatasetLabels)
          const newLabels = JSON.stringify(newDatasetLabels)

          // Check if Labels are equal and if dataset length is equal
          if (newLabels === oldLabels && oldData.datasets.length === newData.datasets.length) {
            newData.datasets.forEach((dataset, i) => {
              // Get new and old dataset keys
              const oldDatasetKeys = Object.keys(oldData.datasets[i])
              const newDatasetKeys = Object.keys(dataset)

              // Get keys that aren't present in the new data
              const deletionKeys = oldDatasetKeys.filter((key) => {
                return key !== '_meta' && newDatasetKeys.indexOf(key) === -1
              })

              // Remove outdated key-value pairs
              deletionKeys.forEach((deletionKey) => {
                delete chart.data.datasets[i][deletionKey]
              })

              // Update attributes individually to avoid re-rendering the entire chart
              for (const attribute in dataset) {
                if (dataset.hasOwnProperty(attribute)) {
                  chart.data.datasets[i][attribute] = dataset[attribute]
                }
              }
            })

            chart.data.labels = newData.labels
            chart.update()
          } else {
            chart.destroy()
            this.renderChart(this.chartData, this.options)
          }
        }
      }
    }
  }
}
