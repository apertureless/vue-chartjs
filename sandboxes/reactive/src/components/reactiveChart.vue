<script>
import { defineComponent, ref, h, onMounted } from 'vue'
import { Bar } from 'vue-chartjs'
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

export default defineComponent({
  name: 'ReactiveChart',
  components: {
    Bar
  },
  props: {
    chartId: {
      type: String,
      default: 'bar-chart'
    },
    width: {
      type: Number,
      default: 400
    },
    height: {
      type: Number,
      default: 400
    },
    cssClasses: {
      default: '',
      type: String
    },
    styles: {
      type: Object,
      default: () => {}
    },
    plugins: {
      type: Object,
      default: () => {}
    }
  },
  setup(props) {
    const chartData = ref({})

    const chartOptions = {
      responsive: true,
      maintainAspectRatio: false
    }

    function fillData() {
      const updatedChartData = {
        labels: [
          'January' + getRandomInt(),
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
              getRandomInt(),
              getRandomInt(),
              getRandomInt(),
              getRandomInt(),
              getRandomInt(),
              getRandomInt(),
              getRandomInt(),
              getRandomInt(),
              getRandomInt(),
              getRandomInt(),
              getRandomInt(),
              getRandomInt()
            ]
          }
        ]
      }

      chartData.value = { ...updatedChartData }
    }

    function getRandomInt() {
      return Math.floor(Math.random() * (50 - 5 + 1)) + 5
    }

    onMounted(() => {
      setInterval(() => {
        fillData()
      }, 5000)
    })

    return () =>
      h(Bar, {
        chartData: chartData.value,
        chartOptions,
        chartId: props.chartId,
        width: props.width,
        height: props.height,
        cssClasses: props.cssClasses,
        styles: props.styles,
        plugins: props.plugins
      })
  }
})
</script>
