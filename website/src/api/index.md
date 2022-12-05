# Coding Reference

## Props

There are some basic props defined in the components provided by `vue-chartjs`.

| Prop | Description |
|---|---|
| data | The data object that is passed into the Chart.js chart |
| options | The options object that is passed into the Chart.js chart |
| datasetIdKey | Key name to identificate dataset |
| plugins | The plugins array that is passed into the Chart.js chart |
| updateMode | A mode string to indicate transition configuration should be used. |

Rest props will fall through to the canvas element.

## Global Methods

Global Methods need to be imported.

### createTypedChart

- **Type:** `Function`
- **Arguments**:`chart-type`, `chart-controller`
- **Usage:**

```js
import { createTypedChart } from 'vue-chartjs'
import { LineController } from 'chart.js'

const CustomLine = createTypedChart('line', LineController)
```
