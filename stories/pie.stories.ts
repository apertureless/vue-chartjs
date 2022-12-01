import 'chart.js/auto'
import { Pie } from '../src'
import * as pieChartConfig from '../sandboxes/pie/src/chartConfig'

export default {
  title: 'PieChart',
  component: Pie,
  parameters: {
    layout: 'centered'
  }
}

export function Default(args) {
  return {
    components: { Pie },
    template: '<Pie v-bind="args" />',
    setup() {
      return { args }
    }
  }
}

Default.args = {
  id: 'pie-chart',
  width: 400,
  height: 400,
  ...pieChartConfig
}
