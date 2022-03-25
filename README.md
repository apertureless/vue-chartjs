# vue-chartjs

<img align="right" width="150" height="150" alt="vue-chartjs logo" src="/assets/vue-chartjs.png">

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
[![Donate](assets/donate.svg)](https://www.paypal.me/apertureless/50eur)
[![ko-fi](https://www.ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/C0C1WP7C)

<br />
<a href="#install">Install</a>
<span>&nbsp;&nbsp;•&nbsp;&nbsp;</span>
<a href="#docs">Docs</a>
<span>&nbsp;&nbsp;•&nbsp;&nbsp;</span>
<a href="#how-to-use">How to use</a>
<span>&nbsp;&nbsp;•&nbsp;&nbsp;</span>
<a href="#migration-to-v4">Migration to v4</a>
<span>&nbsp;&nbsp;•&nbsp;&nbsp;</span>
<a href="#demo">Demo</a>
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

## Docs

- 📖 [v3 Docs](http://vue-chartjs.org/)

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
      type: Object,
      default: () => {}
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
      type: Object as PropType<PluginOptionsByType<'bar'>>,
      default: () => {}
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

## Reactivity

vue-chartjs will update or re-render the chart if new data is passed.

## Migration to v4

With v4, this library introduces a number of breaking changes. In order to improve performance, offer new features, and improve maintainability, it was necessary to break backwards compatibility, but we aimed to do so only when worth the benefit.

v4 is fully compatible with Chart.js v3.

### Tree-shaking

v4 of this library, [just like Chart.js v3](https://www.chartjs.org/docs/latest/getting-started/v3-migration.html#setup-and-installation), is tree-shakable. It means that you need to import and register the controllers, elements, scales, and plugins you want to use.

For a list of all the available items to import, see [Chart.js docs](https://www.chartjs.org/docs/latest/getting-started/integration.html#bundlers-webpack-rollup-etc).

v3:

```javascript
import { Bar } from 'vue-chartjs'
```

v4 — lazy way:

```javascript
import 'chart.js/auto';
import { Bar } from 'vue-chartjs'
```

v4 — tree-shakable way:

```javascript
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)
```

Using the "lazy way" is okay to simplify the migration, but please consider using the tree-shakable way to decrease the bundle size.

Please note that typed chart components register their controllers by default, so you don't need to register them by yourself. For example, when using the Pie component, you don't need to register PieController explicitly.

```javascript
import { Pie } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, CategoryScale } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale)
```

### Changing the creation of Charts

In v3, you needed to import the component, and then either use extends or mixins and add it.

v3:

```javascript
// BarChart.js
import { Bar } from 'vue-chartjs'

export default {
  extends: Bar,
  mounted () {
    // Overwriting base render method with actual data.
    this.renderChart({
      labels: ['January', 'February', 'March'],
      datasets: [
        {
          label: 'GitHub Commits',
          backgroundColor: '#f87979',
          data: [40, 20, 12]
        }
      ]
    })
  }
}
```

```vue
<template>
  <BarChart />
</template>

<script>
// DataPage.vue
import BarChart from 'path/to/component/BarChart'

export default {
  name: 'DataPage',
  components: { BarChart }
}
<script>
```

In v4, you need to import the component, pass props to it, and use Chart component as a standard Vue component.

```vue
<template>
  <Bar :chart-data="chartData" />
</template>

<script>
// DataPage.vue
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default {
  name: 'BarChart',
  components: { Bar },
  data() {
    return {
      chartData: {
        labels: [ 'January', 'February', 'March'],
        datasets: [
          {
            label: 'Data One',
            backgroundColor: '#f87979',
            data: [40, 20, 12]
          }
        ]
      }
    }
  }
}
</script>
```

### New reactivity system

v3 does not update or re-render the chart if new data is passed. You needed to use `reactiveProp` and `reactiveData` mixins for that.

v3:

```javascript
import { Line, mixins } from 'vue-chartjs'

export default {
  extends: Line,
  mixins: [mixins.reactiveProp],
  props: ['chartData', 'options'],
  mounted () {
    this.renderChart(this.chartData, this.options)
  }
}
```

v4 charts have data change watcher by default. v4 will update or re-render the chart if new data is passed. Mixins have been removed.

v4:

```vue
<template>
  <Bar :chart-data="chartData" />
</template>

<script>
// DataPage.vue
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default {
  name: 'BarChart',
  components: { Bar },
  computed: {
      chartData() { return /* mutable chart data */ }
    }
}
</script>
```

## Demo

- 📺 [Demo](http://demo.vue-chartjs.org/)

## Available Charts

### Bar Chart

![Bar](assets/bar.png)

### Line Chart

![Line](assets/line.png)

### Doughnut

![Doughnut](assets/doughnut.png)

### Pie

![Pie](assets/pie.png)

### Radar

![Pie](assets/radar.png)

### Polar Area

![Pie](assets/polar.png)

### Bubble

![Bubble](assets/bubble.png)

### Scatter

![Scatter](assets/scatter.png)

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
