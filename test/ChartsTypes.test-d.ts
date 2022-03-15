import { h } from 'vue'
import { expectError } from 'tsd'
import { PluginOptionsByType } from 'chart.js'

import { Bar, Radar, Scatter, Doughnut } from '../src'

const chartData = {
  datasets: []
}

/**
 * Should check type-specific props
 */

h(Radar, {
  chartData,
  plugins: {} as PluginOptionsByType<'radar'>
})

h(Scatter, {
  chartData,
  plugins: {} as PluginOptionsByType<'scatter'>
})

h(Bar, {
  chartData,
  chartOptions: {}
})

expectError(
  h(Scatter, {
    chartData,
    plugins: {} as PluginOptionsByType<'bubble'>
  })
)

/**
 * Should check type-specific options
 */

h(Doughnut, {
  chartData,
  chartOptions: {
    cutout: '75%'
  }
})

expectError(
  h(Scatter, {
    chartData,
    chartOptions: {
      cutout: '75%'
    }
  })
)
