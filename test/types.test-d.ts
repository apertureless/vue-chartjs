import { h } from 'vue'
import { expectError } from 'tsd'
import { Plugin } from 'chart.js'

import { Bar, Radar, Scatter, Doughnut } from '../src'

const data = {
  datasets: []
}

const testPlugin = {
  id: 'test'
}

/**
 * Should check type-specific props
 */

h(Radar, {
  data,
  plugins: []
})

h(Scatter, {
  data,
  plugins: []
})

h(Bar, {
  data,
  options: {}
})

expectError(
  h(Scatter, {
    data,
    plugins: [testPlugin] as Plugin<'bubble'>[]
  })
)

/**
 * Should check type-specific options
 */

h(Doughnut, {
  data,
  options: {
    cutout: '75%'
  }
})

expectError(
  h(Scatter, {
    data,
    options: {
      cutout: '75%'
    }
  })
)
