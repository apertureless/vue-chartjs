import Vue from 'vue'
import Chart from 'chart.js'

export default Vue.extend({
  template: `
    <div>
      <canvas id="bar-chart" width=width height=height v-el:canvas></canvas>
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
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            },
            gridLines: {
              display: false
            }
          }],
          xAxes: [ {
            gridLines: {
              display: false
            },
            categoryPercentage: 0.5,
            barPercentage: 0.2
          }]
        }
      }
    }
  },

  methods: {
    render (data, options = this.options) {
      const chart = new Chart(
        this.$els.canvas.getContext('2d'), {
          type: 'bar',
          data: data,
          options: options
        }
      )
      chart.generateLegend()
    }
  }
})
