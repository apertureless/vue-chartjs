# Coding Reference

## Props

There are some basic props defined in the components provided by `vue-chartjs`. Because you `extend` them, they are *invisible*, but you can overwrite them:

| Prop | Description |
|---|---|
| width | chart width |
| height | chart height |
| chart-id | id of the canvas |
| css-classes | String with css classes for the surrounding div |
| styles | Object with css styles for the surrounding div container |
| plugins | Array with chartjs plugins |

## Events

If the `reactiveData` or `reactiveProp` mixin is attached, following events will be emitted:

| Event | Description|
|---|---|
| `chart:render` | if the mixin performs a complete rerender |
| `chart:destroy` | if the mixin deletes the chart object instance |
| `chart:update` | if the mixin performs an update instead of a re-render |
| `labels:update` | if new labels were set |
| `xlabels:update` | if new xLabels were set |
| `ylabels:update` | if new yLabels were set |


## Global Methods
Global Methods need to be imported.

### generateChart

- **Type:** `Function`
- **Arguments**: `chart-id`, `chart-type`
- **Usage:**

```js
import { generateChart } from 'vue-chartjs'
// First argument is the chart-id, second the chart type.
const CustomLine = generateChart('custom-line', 'LineWithLine')
```

## Instance Methods

Instance methods can be used inside your chart component.

### generateLegend()

Helper function to generate a HTML legend.

- **Type:** `Function`
- **Arguments**: `none`
- **Usage:**

```js {11}
import { Line } from 'vue-chartjs'

export default {
  extends: Line,
  props: ['datasets', 'options']
  data: () => ({
    htmlLegend: null
  })
  mounted () {
    this.renderChart(this.datasets, this.options)
    this.htmlLegend = this.generateLegend()
  }
}

```

### addPlugin

In Chart.js you can define global and inline plugins. Global plugins are working without problems with `vue-chartjs` like in the [Chart.js docs](http://www.chartjs.org/docs/latest/developers/plugins.html) described.

If you want to add inline plugins, `vue-chartjs` exposes a helper method called `addPlugin()`
You should call `addPlugin()` before the `renderChart()` method.

- **Type:** `Function`
- **Arguments**: `Array` of Plugins
- **Usage:**

```js
mounted () {
  this.addPlugin({
    id: 'my-plugin',
    beforeInit: function (chart) {
      ....
    }
  })
}
```

### renderChart()

Creates a Chart.js instance and renders the chart.

- **Type:** `Function`
- **Arguments**: `Chart Data`, `Chart Options`
- **Usage:**

```js
mounted () {
  this.renderChart({
    labels: ['January', 'February'],
    datasets: [
      {
        label: 'Data One',
        backgroundColor: '#f87979',
        data: [40, 20]
      }
    ]},
    {
      responsive: true
    }
  )
}
```

## Chart.js Object

You can access the Chart.js object inside your chart component with `this.$data._chart`

## Canvas

You can access the canvas with `this.$refs.canvas`
