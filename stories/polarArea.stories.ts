import 'chart.js/auto'
import { PolarArea } from '../src/index.js'
import * as polarAreaChartConfig from '../sandboxes/polar-area/src/chartConfig.js'

export default {
  title: 'PolarAreaChart',
  component: PolarArea,
  parameters: {
    layout: 'centered'
  }
}

export function Default(args) {
  return {
    components: { PolarArea },
    template: '<PolarArea v-bind="args" />',
    setup() {
      return { args }
    }
  }
}

Default.args = {
  id: 'polar-area-chart',
  width: 400,
  height: 400,
  ...polarAreaChartConfig
}
