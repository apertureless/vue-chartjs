import 'chart.js/auto'
import LineWithLineChart from '../sandboxes/custom/src/components/LineWithLineChart'
import * as customChartConfig from '../sandboxes/custom/src/chartConfig'

export default {
  title: 'CustomChart',
  component: LineWithLineChart,
  parameters: {
    layout: 'centered'
  }
}

export function Default(args) {
  return {
    components: { LineWithLineChart },
    template: '<LineWithLineChart v-bind="args" />',
    setup() {
      return { args }
    }
  }
}

Default.args = {
  id: 'custom-chart',
  width: 400,
  height: 400,
  ...customChartConfig
}
