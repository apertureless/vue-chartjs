// import Bar from './BaseCharts/Bar'
// import Doughnut from './BaseCharts/Doughnut'
// import Line from './BaseCharts/Line'
// import Pie from './BaseCharts/Pie'
// import PolarArea from './BaseCharts/PolarArea'
// import Radar from './BaseCharts/Radar'

// const VueCharts = {
//   Bar,
//   Doughnut,
//   Line,
//   Pie,
//   PolarArea,
//   Radar
// }

// module.exports = VueCharts

import Vue from 'vue'
import App from './App'
import { optionExtend } from './helpers/options'

/* eslint-disable no-new */
new Vue({
  el: 'body',
  components: { App }
})

let defaultObj = {
  options: {
    scale: {
      x: 12,
      y: 13
    }
  }
}

let newObj = {
  options: {
    scale: {
      x: 66
    }
  }
}

let mergedObj = optionExtend(defaultObj, newObj)
let testMerge = Object.assign(defaultObj, newObj)
console.log(mergedObj)
console.log(testMerge)
