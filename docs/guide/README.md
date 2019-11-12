# Getting Started

**vue-chartjs** is a wrapper for [Chart.js](https://github.com/chartjs/Chart.js) in Vue. You can easily create reusable chart components.

## Introduction

`vue-chartjs` lets you use Chart.js without much hassle inside Vue. It's perfect for people who need simple charts up and running as fast as possible.

It abstracts the basic logic but exposes the Chart.js object to give you maximal flexibility.

## Installation

### NPM

You can install `vue-chartjs` over `npm`. However, you also need to add `chart.js` as a dependency to your project. Because `Chart.js` is a peerDependency. This way you have full control over the versioning of Chart.js

`yarn add vue-chartjs chart.js` or `npm install vue-chartjs chart.js --save`

::: tip
If you are using vue 1.x please use the `legacy` tag. However, the Vue 1 version is not maintained anymore.

`yarn add vue-chartjs@legacy`
:::

### Browser

You can also use `vue-chartjs` directly in the browser.
First, add the `Chart.js` script and then the `vue-chartjs` script.

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.7.1/Chart.min.js"></script>
<script src="https://unpkg.com/vue-chartjs/dist/vue-chartjs.min.js"></script>
```

## Integration

Every chart type that is available in `Chart.js` is exported as a named component and can be imported as such. These components are normal Vue components, however you need to `extend` it.

The idea behind `vue-chartjs` is to provide easy to use components, with maximum flexibility and extensibility. To achieve this, you need to create your own *Chart Component*  and extend it with the provided `vue-chartjs` components.

This way, the methods and logic in the Chart components, get merged into your own chart component.

## Creating your first Chart

You need to import the base chart and extend it. This gives more flexibility when working with different data. You can encapsulate your components and use props to pass data or you can input them directly inside the component. However, your component is not reusable this way.

You can import the whole package or each module individual. Then you need either to use `extends:` or `mixins:[]`. And then in the `mounted()` hook, call `this.renderChart()`. This will create your chart instance.

```js{1,4,6}
import { Bar } from 'vue-chartjs'

export default {
  extends: Bar,
  mounted () {
    this.renderChart(data, options)
  }
}
```

:::tip
You can either use `extends: Bar` or `mixins: [Bar]`
:::

The method `this.renderChart()` is provided by the `Bar` component and is accepting two parameters. Both are `objects`. The first one is your chart data and the second one is an options object.

Check out the official [Chart.js docs](http://www.chartjs.org/docs/latest/#creating-a-chart) to see the object structure you need to provide.

### Vue Single File Components

Most examples in the docs are based on javascript files and not `.vue` files. This is because you mostly will only need the `<script>` block. You can, however, use `.vue` files as well.

**Chart.vue**

```js
<script>
import { Line } from 'vue-chartjs'

export default {
  extends: Line,
  props: ['chartdata', 'options'],
  mounted () {
    this.renderChart(this.chartdata, this.options)
  }
}
</script>

<style>
</style>
```

::: danger Template Tag can not be merged
Do not include the `<template>` tag to your `.vue` files. Vue can **not** merge templates. If you add an empty `<template>` tag, Vue will take the template from your component and not from the extended one, which will result in an empty template and errors.
:::

## Updating Charts

Chart.js does not provide a live update if you change the datasets. However, `vue-chartjs` provides two mixins to achieve this.

- `reactiveProp`
- `reactiveData`

Both mixins do actually achieve the same. Most of the time you will use `reactiveProp`. It extends the logic of your chart component and automatically creates a prop named `chartData` and adds a `vue watch` on this prop. On data change, it will either call `update()` if only the data inside the datasets has changed or `renderChart()` if new datasets were added.

`reactiveData` simply creates a local chartData variable which is not a prop! and adds a watcher. This is only useful, if you need single purpose charts and make an API call inside your chart component.

### Example

**LineChart.js**
```javascript
import { Line, mixins } from 'vue-chartjs'
const { reactiveProp } = mixins

export default {
  extends: Line,
  mixins: [reactiveProp],
  props: ['options'],
  mounted () {
    // this.chartData is created in the mixin.
    // If you want to pass options please create a local options object
    this.renderChart(this.chartData, this.options)
  }
}
```

**RandomChart.vue**

```javascript
<template>
  <div class="small">
    <line-chart :chart-data="datacollection"></line-chart>
    <button @click="fillData()">Randomize</button>
  </div>
</template>

<script>
  import LineChart from './LineChart.js'

  export default {
    components: {
      LineChart
    },
    data () {
      return {
        datacollection: null
      }
    },
    mounted () {
      this.fillData()
    },
    methods: {
      fillData () {
        this.datacollection = {
          labels: [this.getRandomInt(), this.getRandomInt()],
          datasets: [
            {
              label: 'Data One',
              backgroundColor: '#f87979',
              data: [this.getRandomInt(), this.getRandomInt()]
            }, {
              label: 'Data One',
              backgroundColor: '#f87979',
              data: [this.getRandomInt(), this.getRandomInt()]
            }
          ]
        }
      },
      getRandomInt () {
        return Math.floor(Math.random() * (50 - 5 + 1)) + 5
      }
    }
  }
</script>

<style>
  .small {
    max-width: 600px;
    margin:  150px auto;
  }
</style>
```

::: danger Limitations

[Caveats](https://vuejs.org/v2/guide/list.html#Caveats)
[Change-Detection-Caveats](https://vuejs.org/v2/guide/reactivity.html#Change-Detection-Caveats)
[vm.$watch](https://vuejs.org/v2/api/#vm-watch)

:::


### Events

The reactive mixins will emit events if the data changes. You can listen to them with `v:on` on the chart component. Following events are available:

- `chart:render` - if the mixin performs a complete rerender
- `chart:destroy` - if the mixin deletes the chart object instance
- `chart:update` - if the mixin performs an update instead of a re-render
- `labels:update` - if new labels were set
- `xlabels:update` if new xLabels were set
- `ylabels:update` - if new yLabels were set


### Troubleshooting

The reactivity system at its current state is not **robust**. You will run into several problems with it because there are many use-cases and ways to pass in your data.

#### Options

The `options` object is not reactive right now. So if you dynamically change the chart options, they will not be recognized by the mixin. You can create a watcher to destroy and rerender when chart options are updated.

If you are using the mixin you need to pass in your options as a prop names `options`. This is important because the mixin will call chart.js `update()` method or destroy and render a new chart. If the mixin renders a new chart it calls `this.renderChart(this.chartData, this.options)`.

But if you pass in your options directly in your `mounted()` hook, they get lost.

::: danger Wrong Way
```js {7}
import { Line, mixins } from 'vue-chartjs'

export default {
  components: { Line }
  mixins: [mixins.reactiveProp],
  mounted () {
    this.renderChart(this.chartData, {responsive: true})
  }
}
```
:::

::: tip Right Way
```js {7}
import { Line, mixins } from 'vue-chartjs'

export default {
  components: { Line }
  mixins: [mixins.reactiveProp],
  mounted () {
    this.renderChart(this.chartData, this.options)
  }
}
```

:::

#### Own watcher

If you transform your data a lot of changing it (instead of pushing new data) it is the best, if you implement your own watcher.
You can then either call `this.$data._chart.update()` or `this.renderChart()` by yourself, depending on your needs.

A simple watcher would be:

```js
watch: {
  chartData () {
    this.$data._chart.update()
  }
}
```

## Examples

### Chart with props

Your goal should be to create reusable chart components. For this purpose, you should utilize Vue.js props to pass in your options and your chart data. This way the chart itself does not care, about fetching data and is only for presentation.

First, create your component

```js
import { Line } from 'vue-chartjs'

export default {
  extends: Line,
  props: {
    chartdata: {
      type: Object,
      default: null
    },
    options: {
      type: Object,
      default: null
    }
  },
  mounted () {
    this.renderChart(this.chartdata, this.options)
  }
}
```

After that you can add your chart component to a parent component

```js
<line-chart :chartdata="chartData" :options="chartOptions"/>
```

### Chart with local data

You can handle your chart data directly in your own chart component. You only need to pass it to the `renderChart()` method.

```js
import { Bar } from 'vue-chartjs'

export default {
  extends: Bar,
  data: () => ({
    chartdata: {
      labels: ['January', 'February'],
      datasets: [
        {
          label: 'Data One',
          backgroundColor: '#f87979',
          data: [40, 20]
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false
    }
  }),

  mounted () {
    this.renderChart(this.chartdata, this.options)
  }
}
```

### Chart with API data

It is a common pattern to use an API to get your data. However, there are some things to keep in mind. The most common problem is, that you mount your chart component directly and pass in data from an async API call. The problem with this approach is, that chart.js tries to render your chart and access the chart data, but your API call is async. So you chart mounts before your data arrives.

To prevent this, a simple `v-if` is the best solution.

Create your chart component with a data prop and options prop, so we can pass in our data and options from a container component.

**Chart.vue**

```js
import { Line } from 'vue-chartjs'

export default {
  extends: Line,
  props: {
    chartdata: {
      type: Object,
      default: null
    },
    options: {
      type: Object,
      default: null
    }
  },
  mounted () {
    this.renderChart(this.chartdata, this.options)
  }
}
```

Then create a container component, which handles your api call or vuex connection.
**ChartContainer.vue**

```html {4}
<template>
  <div class="container">
    <line-chart
      v-if="loaded"
      :chartdata="chartdata"
      :options="options"/>
  </div>
</template>

<script>
import LineChart from './Chart.vue'

export default {
  name: 'LineChartContainer',
  components: { LineChart },
  data: () => ({
    loaded: false,
    chartdata: null
  }),
  async mounted () {
    this.loaded = false
    try {
      const { userlist } = await fetch('/api/userlist')
      this.chartdata = userlist
      this.loaded = true
    } catch (e) {
      console.error(e)
    }
  }
}
</script>
```

### Chart with dynamic styles

You can set `responsive: true` and pass in a styles object which get applied as inline styles to the outer div. This way you can change the height and width of the outer container dynamically. Which is not the default behaviour of chart.js. It is best to use computed properties for this.

::: warning
 You need to set `position: relative`
:::

```html
<template>
  <div>
    <line-chart :styles="myStyles"/>
    <button @click="increase()">Increase height</button>
  </div>
</template>

<script>
export default {
  data () {
    return {
      height: 300
    }
  },
  methods: {
    increase () {
     this.height += 10
    }
  },
  computed: {
    myStyles () {
      return {
        height: `${this.height}px`,
        position: 'relative'
      }
    }
  }
}
</script>
```

### Custom / New Charts

Sometimes you need to extend the default Chart.js charts. There are a lot of [examples](http://www.chartjs.org/docs/latest/developers/charts.html) how to extend and modify the default charts. Or you want to create a own chart type.

In `vue-chartjs`, you can do this pretty much the same way.

```js
// 1. Import Chart.js so you can use the global Chart object
import Chart from 'chart.js'
// 2. Import the `generateChart()` method to create the vue component.
import { generateChart } from 'vue-chartjs'

// 3. Extend one of the default charts
// http://www.chartjs.org/docs/latest/developers/charts.html
Chart.defaults.LineWithLine = Chart.defaults.line;
Chart.controllers.LineWithLine = Chart.controllers.line.extend({ /* custom magic here */})

// 4. Generate the vue-chartjs component
// First argument is the chart-id, second the chart type.
const CustomLine = generateChart('custom-line', 'LineWithLine')

// 5. Extend the CustomLine Component just like you do with the default vue-chartjs charts.

export default {
  extends: CustomLine,
  mounted () {
    // ....
  }
}
```

## Resourcess

You can find here some resources like tutorials on how to use `vue-chartjs`

- [Using vue-chartjs with WordPress](https://medium.com/@apertureless/wordpress-vue-and-chart-js-6b61493e289f)
- [Create stunning Charts with Vue and Chart.js](https://hackernoon.com/creating-stunning-charts-with-vue-js-and-chart-js-28af584adc0a)
- [Let’s Build a Web App with Vue, Chart.js and an API Part I](https://hackernoon.com/lets-build-a-web-app-with-vue-chart-js-and-an-api-544eb81c4b44)
- [Let’s Build a Web App with Vue, Chart.js and an API Part II](https://hackernoon.com/lets-build-a-web-app-with-vue-chart-js-and-an-api-part-ii-39781b1d5acf)
- [Build a realtime chart with VueJS and Pusher](https://blog.pusher.com/build-realtime-chart-with-vuejs-pusher/)
