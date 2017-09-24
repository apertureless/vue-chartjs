import Bar from '../BaseCharts/Bar'
import reactiveProp from '../mixins/reactiveProp'

export default {
  extends: Bar,
  mixins: [reactiveProp],

  mounted () {
    this.renderChart(this.chartData, {responsive: true, maintainAspectRatio: false})
  }
}
