import BarChart from '../BaseCharts/Bar'
import reactiveData from '../mixins/reactiveProp'

export default BarChart.extend({
  mixins: [reactiveData],

  mounted () {
    this.renderChart(this.chartData)
  }
})
