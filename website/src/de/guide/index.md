# Getting Started

**vue-chartjs** ist ein wrapper für [Chart.js](https://github.com/chartjs/Chart.js) in Vue. Man kann einfach wiederverwendbare Diagram Komponenten erstellen.

Supports Chart.js v4.

## Einleitung

`vue-chartjs` lets you use Chart.js without much hassle inside Vue. It's perfect for people who need simple charts up and running as fast as possible.

It abstracts the basic logic but exposes the Chart.js object to give you maximal flexibility.

:::tip Need an API to fetch data?
Please consider [Cube](https://cube.dev/?ref=eco-vue-chartjs), an open-source API for data apps.
:::

## Installation

You can install `vue-chartjs` over `yarn` or `npm` or `pnpm`. However, you also need to add `chart.js` as a dependency to your project because `Chart.js` is a peerDependency. This way you can have full control over the versioning of `Chart.js`.

```bash
pnpm add vue-chartjs chart.js
# or
yarn add vue-chartjs chart.js
# or
npm i vue-chartjs chart.js
```

## Integration

Every chart type that is available in Chart.js is exported as a named component and can be imported as such. These components are normal Vue components.

The idea behind vue-chartjs is to provide easy-to-use components, with maximal flexibility and extensibility.

## Erstelle das erste Diagram

First, you need to import the base chart.

```javascript
import { Bar } from 'vue-chartjs'
```

Check out the official [Chart.js docs](http://www.chartjs.org/docs/latest/#creating-a-chart) to see the object structure you need to provide.

Just create your own component.

**BarChart.vue**

```vue
<template>
  <Bar
    id="my-chart-id"
    :options="chartOptions"
    :data="chartData"
  />
</template>

<script>
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default {
  name: 'BarChart',
  components: { Bar },
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

Use it in your vue app:

**App.vue**

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

## Updating Charts

Since v4 charts have data change watcher and options change watcher by default. Wrapper will update or re-render the chart if new data or new options is passed. Mixins have been removed.

```vue
<template>
  <Bar :data="chartData" :options="chartOptions" />
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
      chartData() { return /* mutable chart data */ },
      chartOptions() { return /* mutable chart options */ }
    }
}
</script>
```

You may get Vue's `Target is readonly` warnings when you are updating your `chartData`.

If your `chartData` is a `read-only` reactive value, you can override this warning by using a clone:

```vue
<template>
  <Bar :data="JSON.stringify(JSON.parse(chartData))" :options="chartOptions" />
</template>
```

Unless you have a writable computed `chartData`, you won't be able to use the newer `structuredClone`, as you'll likely hit the `Write operation failed: computed value is readonly` error.

You don't need to use a clone if your `chartData` is a [writable computed value](https://vuejs.org/guide/essentials/computed#writable-computed).



## Access to Chart instance

You can get access to chart instance via template refs.

```vue
<template>
  <BarChart ref="bar" />
</template>
```

In Vue3 projects:

```javascript
const chartInstance = this.$refs.bar.chart
```

## Accessibility

To make your charts accessible to all users, you should label your charts.
Please refer also to the official [Chart.js Accessibility notes](https://www.chartjs.org/docs/latest/general/accessibility.html).

### `aria-label`

You can directly label a chart by passing an `aria-label` prop.

```vue
<template>
  <BarChart aria-label="Sales figures for the years 2022 to 2024. Sales in 2022: 987, Sales in 2023: 1209, Sales in 2024: 825." />
</template>
```

### `aria-describedby`

You can reference to a describing element such as a table which describes the data by using the `aria-describedby` property.

```vue
<template>
  <BarChart aria-describedby="my-data-table" />
  <table id="my-data-table">
    <caption>Sales figures for the years 2022 to 2024.</caption>
    <thead>
      <tr>
        <th>2022</th>
        <th>2023</th>
        <th>2024</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>987</td>
        <td>1209</td>
        <td>825</td>
      </tr>
    </tbody>
  </table>
</template>
```

### Fallback-Content

In case the Browser is not able to render the `canvas` element, you should consider providing fallback content by using the Slot of each component.

```vue
<template>
  <BarChart>Chart couldn't be loaded.</BarChart>
</template>
```
