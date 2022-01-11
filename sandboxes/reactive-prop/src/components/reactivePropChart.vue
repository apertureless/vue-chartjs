#Do not include the template tag in your .vue single-file components. Vue can
#not merge templates. If you add an empty template tag, Vue will take the
#template from your component and not from the extended one, which will result
#in an empty template and unexpected errors.

<script>
import { Bar, mixins } from 'vue-chartjs'

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
