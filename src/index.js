import Bar from './BaseCharts/Bar'
import HorizontalBar from './BaseCharts/HorizontalBar'
import Doughnut from './BaseCharts/Doughnut'
import Line from './BaseCharts/Line'
import Pie from './BaseCharts/Pie'
import PolarArea from './BaseCharts/PolarArea'
import Radar from './BaseCharts/Radar'
import Bubble from './BaseCharts/Bubble'
import Scatter from './BaseCharts/Scatter'
import mixins from './mixins/index.js'
import npmCfg from '../package.json'

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
