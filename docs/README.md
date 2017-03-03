---
search: english
---

# vue-chartjs
**vue-chartjs** is a wrapper for [Chart.js](https://github.com/chartjs/Chart.js) in vue. You can easily create reuseable chart components.

## Introduction
`vue-chartjs` let you use chart.js without much hassle inside vue. It's perfect for people who need simple charts up and running as fast as possible.

It abstracts the basic logic but exposes the chart.js object to give you the most possible flexibility.

## Installation
If you are working with Vue.js 2+ simple run:

`yarn add vue-chartjs -S`

If you are using vue 1.x please use the `legancy` tag. However the vue 1 version is not maintained anymore.

`yarn add vue-chartjs@legacy -S`

## Quick Start

You need to import the base chart and extend it. This gives much more flexibility when working with different data.
You can encapsulate your components and use props to pass data or you can directly imput them inside the component. However this way, your component is not reuseable.

You can import the whole package or each module individual.

```javascript
// CommitChart.js
import { Bar } from 'vue-chartjs'

export default Bar.extend({
  mounted () {
    // Overwriting base render method with actual data.
    this.renderChart(data, options)
  }
})
```

You can pass the `renderChart()` method, two arguments:

- Data object
- Options object

### Data object

The data object looks like this:

```javascript
{
  labels: ['January', 'February'],
  datasets: [
    {
      label: 'GitHub Commits',
      backgroundColor: '#f87979',
      data: [40, 20]
    }
  ]
}
```

For more information take a look at the [Chart.js](http://www.chartjs.org/docs/#chart-configuration-chart-data) docs.

## Props

There are some basic props defined in the BaseCharts. Because you `extend()` them, they are *invisible*, but you can overwrite them:

| Prop | Description |
|---|---|
| width | chart width |
| height | chart height |
| id | id of the canvas |


## Examples

Here are some exmaples

### Chart with props

You can create the data and options props to pass data to the chart.

```javascript
// LineChart.js
import { Line } from 'vue-chartjs'

export default Line.extend({
  props: ['data', 'options'],
  mounted () {
    this.renderChart(this.data, this.options)
  }
})
```

After you add your component you can use it:

```html
 <line-chart :data="{your data object}" :options="{your options}"></line-chart>
```

If you want to overwrite the width and height:

```html
 <line-chart
  :data="{your data object}"
  :options="{responsive: false, maintainAspectRatio: false}"
  :width="400"
  :height="200"
  >
 </line-chart>
```

<p class="warning">
  Please keep in mind, that you have to set `responsive: false` to be able to set a fix `width` and `height.
</p>

### Chart with local data

```javascript
import {Bar} from 'vue-chartjs'

export default Bar.extend({
  data () {
    return {
      datacollection: {
        labels: ['January', 'February'],
        datasets: [
          {
            label: 'Data One',
            backgroundColor: '#f87979',
            data: [40, 20]
          }
        ]
      }
    }
  }
  mounted () {
    this.renderChart(this.datacollection, {responsive: true, maintainAspectRatio: false})
  }
})
```

### Reusebale Components

If you want to keep your chart components reuseable, it's the best to add a wrapper to them. This way the chart component is only responsable for the pure data representation and the wrapper component for the logic behind it. There are many different usecases and it is different if you're running a Single Page Application or integrate it in for example laravel.

## Reactive Data

Chart.js does not provide a live update if you change the datasets. However `vue-chartjs` provides two mixins to achive this.

- `reactiveProp`
- `reactiveData`

Both mixins to actually the same. Most of the time you will use `reactiveProp`. It extends the logic of your chart component and automatically creates a prop names `chartData` and add a `vue watch` on this prop. On data change, it will either call `update()` if only the data inside the datasets has changed or `renderChart()` if new datasets were added.

`reactiveData` simply creates a local chartData variable which is not a prop! And add a watcher.
This is only usefull, if you need single purpose charts and make an API call inside your chart component.

```javascript
data () {
  return {
    chartData: null
  }
}
```

### Example

**LineChart.js**
```javascript
import { Line, mixins } from 'vue-chartjs'
const { reactiveProp } = mixins

export default Line.extend({
  mixins: [reactiveProp],
  props: ['options'],
  mounted () {
    // this.chartData is created in the mixin
    this.renderChart(this.chartData, this.options)
  }
})
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

## Chart.js object

Sometimes you need more control over chart.js. Thats why you can access the chart.js instance over `this._chart`

## Available Charts

### Bar Chart
<p class="tip">
  The bar chart has an **optional** third parameter, which is the type.
  The default type is `bar` but you can pass `horizontalBar` if you want horizontal bars.

  `renderChart (data, options, type) {}`

</p>

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

## Webpack & Bundling tools
There are now two version the main entry point is `src/index.js` which is the ES6 source, unbundled.
If you're using webpack it is recommended to use this one. Because the bundled umd version has vue.js and chart.js bundled into it.

However if you have problems o you can import the dist file

```
import VueCharts from 'vue-chartjs/dist/vue-chartjs'
// or
import { Line } from 'vue-chartjs/dist/vue-chartjs'
```

Or you can set an alias.

### Browserify

In order for a browserify user to transpile the code, they would need to install `babelify` and `babel-preset-es2015` and add a .babelrc file in the root of their project with the following code:

```
{
"presets": ["es2015"]
}
```
