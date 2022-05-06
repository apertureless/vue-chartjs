# vue-chartjs

<img align="right" width="150" height="150" alt="vue-chartjs logo" src="https://raw.githubusercontent.com/apertureless/vue-chartjs/main/assets/vue-chartjs.png">

**vue-chartjs** is a wrapper for [Chart.js](https://github.com/chartjs/Chart.js) in vue. You can easily create reuseable chart components.

Supports Chart.js v3 and v2.

[![npm version](https://badge.fury.io/js/vue-chartjs.svg)](https://badge.fury.io/js/vue-chartjs)
[![codecov](https://codecov.io/gh/apertureless/vue-chartjs/branch/master/graph/badge.svg)](https://codecov.io/gh/apertureless/vue-chartjs)
[![Build Status](https://img.shields.io/github/workflow/status/apertureless/vue-chartjs/CI.svg)](https://github.com/apertureless/vue-chartjs/actions)
[![Package Quality](http://npm.packagequality.com/shield/vue-chartjs.svg)](http://packagequality.com/#?package=vue-chartjs)
[![npm](https://img.shields.io/npm/dm/vue-chartjs.svg)](https://www.npmjs.com/package/vue-chartjs)
[![Gitter chat](https://img.shields.io/gitter/room/TechnologyAdvice/Stardust.svg)](https://gitter.im/vue-chartjs/Lobby)
[![license](https://img.shields.io/github/license/mashape/apistatus.svg)](https://github.com/apertureless/vue-chartjs/blob/master/LICENSE.txt)
[![CDNJS version](https://img.shields.io/cdnjs/v/vue-chartjs.svg)](https://cdnjs.com/libraries/vue-chartjs)
[![Known Vulnerabilities](https://snyk.io/test/github/apertureless/vue-chartjs/badge.svg)](https://snyk.io/test/github/apertureless/vue-chartjs)
[![Donate](https://raw.githubusercontent.com/apertureless/vue-chartjs/main/assets/donate.svg)](https://www.paypal.me/apertureless/50eur)
[![ko-fi](https://www.ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/C0C1WP7C)

<br />
<a href="#install">Install</a>
<span>&nbsp;&nbsp;•&nbsp;&nbsp;</span>
<a href="#how-to-use">How to use</a>
<span>&nbsp;&nbsp;•&nbsp;&nbsp;</span>
<a href="#docs">Docs</a>
<span>&nbsp;&nbsp;•&nbsp;&nbsp;</span>
<a href="https://slack.cube.dev/?ref=eco-vue-chartjs">Slack</a>
<span>&nbsp;&nbsp;•&nbsp;&nbsp;</span>
<a href="https://stackoverflow.com/questions/tagged/vue-chartjs">Stack Overflow</a>
<br />
<hr />

## Install

Install this library with peer dependencies:

```bash
pnpm add vue-chartjs chart.js
# or
yarn add vue-chartjs chart.js
# or
npm i vue-chartjs chart.js
```

We recommend using `chart.js@^3.0.0`.

<hr />

Need an API to fetch data? Consider [Cube](https://cube.dev/?ref=eco-vue-chartjs), an open-source API for data apps.

<br />

[![supported by Cube](https://user-images.githubusercontent.com/986756/154330861-d79ab8ec-aacb-4af8-9e17-1b28f1eccb01.svg)](https://cube.dev/?ref=eco-vue-chartjs)

## How to use

This package works with version 2.x and 3.x of Vue.

Import the component.

```javascript
import { Bar } from 'vue-chartjs'
```

For Vue 2 projects, you need to import from `vue-chartjs/legacy`.

```javascript
import { Bar } from 'vue-chartjs/legacy'
```

Just create your own component.

```vue
<template>
  <Bar
    :chart-options="chartOptions"
    :chart-data="chartData"
    :chart-id="chartId"
    :dataset-id-key="datasetIdKey"
    :plugins="plugins"
    :css-classes="cssClasses"
    :styles="styles"
    :width="width"
    :height="height"
  />
</template>

<script>
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default {
  name: 'BarChart',
  components: { Bar },
  props: {
    chartId: {
      type: String,
      default: 'bar-chart'
    },
    datasetIdKey: {
      type: String,
      default: 'label'
    },
    width: {
      type: Number,
      default: 400
    },
    height: {
      type: Number,
      default: 400
    },
    cssClasses: {
      default: '',
      type: String
    },
    styles: {
      type: Object,
      default: () => {}
    },
    plugins: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      chartData: {
        labels: [ 'January', 'February', 'March' ],
        datasets: [ { data: [40, 20, 12] } ]
      },
      chartOptions: {
        responsive: true
      }
    }
  }
}
</script>
```

or in TypeScript

```ts
// BarChart.ts
import { defineComponent, h, PropType } from 'vue'
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, PluginOptionsByType } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default defineComponent({
  name: 'BarChart',
  components: { Bar },
  props: {
    chartId: {
      type: String,
      default: 'bar-chart'
    },
    width: {
      type: Number,
      default: 400
    },
    height: {
      type: Number,
      default: 400
    },
    cssClasses: {
      default: '',
      type: String
    },
    styles: {
      type: Object as PropType<Partial<CSSStyleDeclaration>>,
      default: () => {}
    },
    plugins: {
      type: Array as PropType<Plugin<'bar'>[]>,
      default: () => []
    }
  },
  setup(props) {
    const chartData = {
      labels: [ 'January', 'February', 'March' ],
      datasets: [ { data: [40, 20, 12] } ]
    }

    const chartOptions = { responsive: true }

    return () =>
      h(Bar, {
        chartData,
        chartOptions,
        chartId: props.chartId,
        width: props.width,
        height: props.height,
        cssClasses: props.cssClasses,
        styles: props.styles,
        plugins: props.plugins
      })
  }
})

```

Use it in your vue app

```vue
<template>
  <BarChart />
</template>

<script>
import BarChart from 'path/to/component/BarChart'

export default {
  name: 'App',
  components: { BarChart }
}
</script>
```

## Docs

- [Reactivity](https://vue-chartjs.org/guide/#updating-charts)
- [Access to Chart instance](https://vue-chartjs.org/guide/#access-to-chart-instance)
- [Migration to v4](https://vue-chartjs.org/migration-to-v4/)
- [API](https://vue-chartjs.org/api/)
- [Examples](https://vue-chartjs.org/examples/)

## Build Setup

``` bash
# install dependencies
pnpm install

# build for production with minification
pnpm build

# run unit tests
pnpm unit

# run all tests
pnpm test
```

## Contributing

1. Fork it ( https://github.com/apertureless/vue-chartjs/fork )
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create a new Pull Request

## License

This software is distributed under [MIT license](LICENSE.txt).

<a href="https://www.buymeacoffee.com/xcqjaytbl" target="_blank"><img src="https://www.buymeacoffee.com/assets/img/custom_images/purple_img.png" alt="Buy Me A Coffee" style="height: auto !important;width: auto !important;" ></a>
