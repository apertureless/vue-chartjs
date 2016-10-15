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

          let newDataLabels = newData.datasets.map((dataset) => {
            return dataset.label
          })

          let oldDataLabels = oldData.datasets.map((dataset) => {
            return dataset.label
          })

          if (JSON.stringify(newDataLabels) === JSON.stringify(oldDataLabels)) {
            newData.datasets.forEach((dataset, i) => {
              chart.data.datasets[i].data = dataset.data
            })
            chart.data.labels = newData.labels
            chart.update()
          } else {
            this.renderChart(this.chartData, this.options)
          }
        }
      }
    }
  }
}
