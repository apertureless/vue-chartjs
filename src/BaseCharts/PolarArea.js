import Vue from 'vue'
import Chart from 'chart.js'

export default Vue.extend({
  template: `
    <div>
      <canvas id="polar-chart" width=width height=height v-el:canvas></canvas>
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
      options: {
      }
    }
  },

  methods: {
    render (data, options = this.options) {
      this._chart = new Chart(
        this.$els.canvas.getContext('2d'), {
          type: 'polarArea',
          data: data,
          options: options
        }
      )
      this._chart.generateLegend()
    }
  },
  beforeDestroy () {
    this._chart.destroy()
  }
})
