import 'chart.js/auto'
import { Scatter } from '../src/index.js'
import * as scatterChartConfig from '../sandboxes/scatter/src/chartConfig.js'

export default {
  title: 'ScatterChart',
  component: Scatter,
  parameters: {
    layout: 'centered'
  }
}

export function Default(args) {
  return {
    components: { Scatter },
    template: '<Scatter v-bind="args" />',
    setup() {
      return { args }
    }
  }
}

Default.args = {
  id: 'scatter-chart',
  width: 400,
  height: 400,
  ...scatterChartConfig
}
