import 'chart.js/auto'
import { Bar } from '../src/index.js'
import * as barChartConfig from '../sandboxes/bar/src/chartConfig.js'

export default {
  title: 'BarChart',
  component: Bar,
  parameters: {
    layout: 'centered'
  }
}

export function Default(args) {
  return {
    components: { Bar },
    template: '<Bar v-bind="args" />',
    setup() {
      return { args }
    }
  }
}

Default.args = {
  id: 'bar-chart',
  width: 400,
  height: 400,
  ...barChartConfig
}
