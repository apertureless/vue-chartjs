<script>
import ReactivePropChart from './reactivePropChart.vue'

import { defineComponent, ref, h, onMounted } from 'vue'
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
    ReactivePropChart
  },
  setup() {
    const chartData = ref({})

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
      h(ReactivePropChart, {
        chartData: chartData.value
      })
  }
})
</script>
