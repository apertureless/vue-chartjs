import BarChart from '../BaseCharts/Bar'
import reactiveProp from '../mixins/reactiveProp'

export default BarChart.extend({
  mixins: [reactiveProp],

  mounted () {
    this.renderChart(this.chartData)
  }
})
