import BarChart from '../BaseCharts/Bar'
import reactiveProp from '../mixins/reactiveProp'

export default {
  extends: {...BarChart},
  mixins: [reactiveProp],

  mounted () {
    this.renderChart(this.chartData, {responsive: true, maintainAspectRatio: false})
  }
}
