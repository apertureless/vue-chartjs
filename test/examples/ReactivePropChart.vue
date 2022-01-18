<script>
import { Bar, mixins } from '../../src/index'

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
