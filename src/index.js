import mixins from './mixins/index.js'
import npmCfg from '../package.json'
import {
  Bar,
  HorizontalBar,
  Doughnut,
  Line,
  Pie,
  PolarArea,
  Radar,
  Bubble,
  Scatter
} from './BaseCharts'

const VueCharts = {
  version: npmCfg.version,
  Bar,
  HorizontalBar,
  Doughnut,
  Line,
  Pie,
  PolarArea,
  Radar,
  Bubble,
  Scatter,
  mixins
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
  mixins
}
