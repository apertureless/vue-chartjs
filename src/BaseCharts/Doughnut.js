import Vue from 'vue'
import Chart from 'chart.js'
import { mergeOptions } from '../helpers/options'

export default Vue.extend({
  template: `
    <div>
      <canvas id="doughnut-chart" width=width height=height ref="canvas"></canvas>
    </div>
  `,

  props: {
    width: {
      default: 400,
      type: Number
    },
    height: {
      default: 400,
      type: Number
    }
  },

  data () {
    return {
      defaultOptions: {
      }
    }
  },

  methods: {
    renderChart (data, options) {
      let chartOptions = mergeOptions(this.defaultOptions, options)

      this._chart = new Chart(
        this.$refs.canvas.getContext('2d'), {
          type: 'doughnut',
          data: data,
          options: chartOptions
        }
      )
      this._chart.generateLegend()
    }
  },
  beforeDestroy () {
    this._chart.destroy()
  }
})
