import 'chart.js/auto'
import { Line } from '../src'
import * as lineChartConfig from '../sandboxes/line/src/chartConfig'

export default {
  title: 'LineChart',
  component: Line,
  parameters: {
    layout: 'centered'
  }
}

export function Default(args) {
  return {
    components: { Line },
    template: '<Line v-bind="args" />',
    setup() {
      return { args }
    }
  }
}

Default.args = {
  id: 'line-chart',
  width: 400,
  height: 400,
  ...lineChartConfig
}
