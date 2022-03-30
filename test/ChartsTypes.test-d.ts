import { h } from 'vue'
import { expectError } from 'tsd'
import { Plugin } from 'chart.js'

import { Bar, Radar, Scatter, Doughnut } from '../src'

const chartData = {
  datasets: []
}

const testPlugin = {
  id: 'test'
}

/**
 * Should check type-specific props
 */

h(Radar, {
  chartData,
  plugins: []
})

h(Scatter, {
  chartData,
  plugins: []
})

h(Bar, {
  chartData,
  chartOptions: {}
})

expectError(
  h(Scatter, {
    chartData,
    plugins: [testPlugin] as Plugin<'bubble'>[]
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
