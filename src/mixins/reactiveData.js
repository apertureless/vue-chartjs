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

          let newDataLabels = newData.datasets.map((dataset) => {
            return dataset.label
          })

          let oldDataLabels = oldData.datasets.map((dataset) => {
            return dataset.label
          })

          if (JSON.stringify(newDataLabels) === JSON.stringify(oldDataLabels)) {
            this.forceUpdate(newData, chart)
          } else {
            this.forceRender()
          }
        }
      }
    }
  },
  methods: {
    forceUpdate (newData, chart) {
      newData.datasets.forEach((dataset, i) => {
        chart.data.datasets[i].data = dataset.data
      })

      chart.data.labels = newData.labels
      chart.update()
    },

    forceRender () {
      this.renderChart(this.chartData, this.options)
    }
  }
}
