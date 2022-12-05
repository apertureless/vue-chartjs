import 'chart.js/auto'
import { Radar } from '../src/index.js'
import * as radarChartConfig from '../sandboxes/radar/src/chartConfig.js'

export default {
  title: 'RadarChart',
  component: Radar,
  parameters: {
    layout: 'centered'
  }
}

export function Default(args) {
  return {
    components: { Radar },
    template: '<Radar v-bind="args" />',
    setup() {
      return { args }
    }
  }
}

Default.args = {
  id: 'radar-chart',
  width: 400,
  height: 400,
  ...radarChartConfig
}
