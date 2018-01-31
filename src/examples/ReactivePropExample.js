import { Bar } from '../BaseCharts'
import reactiveProp from '../mixins/reactiveProp'

export default {
  extends: Bar,
  mixins: [reactiveProp],
  data: () => ({
    options: {
      responsive: true,
      maintainAspectRatio: false
    }
  }),

  mounted () {
    this.renderChart(this.chartData, this.options)
  }
}
