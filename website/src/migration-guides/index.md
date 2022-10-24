## Migration from v3 to v4

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
import BarChart from 'path/to/component/BarChart'

export default {
  name: 'DataPage',
  components: { BarChart }
}
</script>
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

## Migration from vue-chart-3

### Uninstall vue-chart-3

```bash
pnpm rm vue-chart-3
# or
yarn remove vue-chart-3
# or
npm uninstall vue-chart-3
```

### Install vue-chartjs

```bash
pnpm add vue-chartjs
# or
yarn add vue-chartjs
# or
npm i vue-chartjs
```

### Change component import path

For Vue 2.7 and Vue 3 projects:

```javascript
import { /* component */ } from 'vue-chartjs'
```

For Vue 2 (<2.7) projects:

```javascript
import { /* component */ } from 'vue-chartjs/legacy'
```

### Rename components

- BarChart to Bar
- DoughnutChart to Doughnut
- LineChart to Line
- PieChart to Pie
- PolarAreaChart to PolarArea
- RadarChart to Radar
- BubbleChart to Bubble
- ScatterChart to Scatter

### Rename props

- options to chartOptions
