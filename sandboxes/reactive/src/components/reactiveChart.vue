#Do not include the template tag in your .vue single-file components. Vue can
#not merge templates. If you add an empty template tag, Vue will take the
#template from your component and not from the extended one, which will result
#in an empty template and unexpected errors.

<script>
import { Bar, mixins } from 'vue-chartjs'

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
