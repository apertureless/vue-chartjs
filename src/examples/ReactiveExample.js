import BarChart from '../BaseCharts/Bar'
import reactiveData from '../mixins/reactiveData'

export default BarChart.extend({
  mixins: [reactiveData],
  data () {
    return {
      chartData: ''
    }
  },
  created () {
    this.fillData()
  },

  mounted () {
    this.renderChart(this.chartData, {responsive: true, maintainAspectRatio: false})

    setInterval(() => {
      this.fillData()
    }, 5000)
  },

  methods: {
    fillData () {
      this.chartData = {
        labels: ['January' + this.getRandomInt(), 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        datasets: [
          {
            label: 'Data One',
            backgroundColor: '#f87979',
            data: [this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt()]
          }
        ]
      }
    },

    getRandomInt () {
      return Math.floor(Math.random() * (50 - 5 + 1)) + 5
    }
  }
})
