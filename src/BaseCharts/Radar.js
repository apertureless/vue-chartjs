import Vue from 'vue'
import Chart from 'chart.js'
import { mergeOptions } from '../helpers/options'

export default Vue.extend({
  template: `
    <div>
      <canvas id="{{chartId}}" width={{width}} height={{height}} v-el:canvas></canvas>
    </div>
  `,

  props: {
    chartId: {
      default: 'radar-chart',
      type: String
    },
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
    render (data, options) {
      let chartOptions = mergeOptions(this.defaultOptions, options)

      this._chart = new Chart(
        this.$els.canvas.getContext('2d'), {
          type: 'radar',
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
