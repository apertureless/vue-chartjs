import Vue from 'vue'
import Chart from 'chart.js'
import { mergeOptions } from '../helpers/options'

export default Vue.extend({
  template: `
    <div>
      <canvas id="pie-chart" width=width height=height v-el:canvas></canvas>
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
        this.$els.canvas.getContext('2d'), {
          type: 'pie',
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
