import mixins from './mixins/index.js'

import {
  Bar,
  HorizontalBar,
  Doughnut,
  Line,
  Pie,
  PolarArea,
  Radar,
  Bubble,
  Scatter,
  generateChart
} from './BaseCharts'

const VueCharts = {
  Bar,
  HorizontalBar,
  Doughnut,
  Line,
  Pie,
  PolarArea,
  Radar,
  Bubble,
  Scatter,
  mixins,
  generateChart
}

export default VueCharts

export {
  VueCharts,
  Bar,
  HorizontalBar,
  Doughnut,
  Line,
  Pie,
  PolarArea,
  Radar,
  Bubble,
  Scatter,
  mixins,
  generateChart
}
