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

const { reactiveProp } = mixins

export default {
  name: 'ReactivePropChart',
  extends: Bar,
  mixins: [reactiveProp],
  data: () => ({
    options: {
      responsive: true,
      maintainAspectRatio: false
    }
  }),
  mounted() {
    this.renderChart(this.chartData, this.options)
  }
}
</script>
