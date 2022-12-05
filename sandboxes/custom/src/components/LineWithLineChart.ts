import { createTypedChart } from 'vue-chartjs'
import { LineController } from 'chart.js'

class LineWithLineController extends LineController {
  static override id = 'line-with-line'

  public override draw() {
    super.draw()

    if (this.chart?.tooltip && this.chart.tooltip.opacity > 0) {
      const ctx = this.chart.ctx
      const x = this.chart.tooltip.x
      const topY = this.chart.scales.y.top
      const bottomY = this.chart.scales.y.bottom

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

const LineWithLineChart = createTypedChart(
  'line-with-line' as 'line',
  LineWithLineController
)

export default LineWithLineChart
