<script>
import { Bar, mixins } from '../../src/index'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

const { reactiveData } = mixins

export default {
  name: 'ReactiveChart',
  extends: Bar,
  mixins: [reactiveData],
  data: () => ({
    chartData: '',
    options: {
      responsive: true,
      maintainAspectRatio: false
    }
  }),
  created() {
    this.fillData()
  },

  mounted() {
    this.renderChart(this.chartData, this.options)

    setInterval(() => {
      this.fillData()
    }, 5000)
  },

  methods: {
    fillData() {
      this.chartData = {
        labels: [
          'January' + this.getRandomInt(),
          'February',
          'March',
          'April',
          'May',
          'June',
          'July',
          'August',
          'September',
          'October',
          'November',
          'December'
        ],
        datasets: [
          {
            label: 'Data One',
            backgroundColor: '#f87979',
            data: [
              this.getRandomInt(),
              this.getRandomInt(),
              this.getRandomInt(),
              this.getRandomInt(),
              this.getRandomInt(),
              this.getRandomInt(),
              this.getRandomInt(),
              this.getRandomInt(),
              this.getRandomInt(),
              this.getRandomInt(),
              this.getRandomInt(),
              this.getRandomInt()
            ]
          }
        ]
      }
    },
    getRandomInt() {
      return Math.floor(Math.random() * (50 - 5 + 1)) + 5
    }
  }
}
</script>
