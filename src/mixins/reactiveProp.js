module.exports = {
  props: {
    chartData: {
      required: true
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
              chart.data.datasets[i] = dataset
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
