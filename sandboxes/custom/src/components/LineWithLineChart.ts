import { createTypedChart } from 'vue-chartjs'
import { LineController } from 'chart.js'

class LineWithLineController extends LineController {
  public override draw() {
    super.draw()

    console.log(this.chart?.tooltip?.active)

    if (this.chart?.tooltip?.active) {
      const ctx = this.chart.ctx
      const x = this.chart.tooltip.x
      const topY = this.chart.scales['y-axis-0'].top
      const bottomY = this.chart.scales['y-axis-0'].bottom

      // draw line
      ctx.save()
      ctx.beginPath()
      ctx.moveTo(x, topY)
      ctx.lineTo(x, bottomY)
      ctx.lineWidth = 2
      ctx.strokeStyle = '#07C'
      ctx.stroke()
      ctx.restore()
    }
  }
}

const LineWithLineChart = createTypedChart('line', LineWithLineController)

export default LineWithLineChart
