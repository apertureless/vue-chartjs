# Coding Reference

## Props

There are some basic props defined in the components provided by `vue-chartjs`.

| Prop | Description |
|---|---|
| chartData | Object with Chart data |
| chartOptions | Object with Chart options |
| datasetIdKey | Id key for Chart data datasets |
| chartId | Id of the canvas |
| width | Chart width |
| height | Chart height |
| canvasAttrs | Attributes of the canvas |
| cssClasses | String with css classes for the surrounding div |
| styles | Object with css styles for the surrounding div container |
| plugins | Array with Chart plugins |

## Events

Charts will emit events if the data changes. You can listen to them in the chart component. The following events are available:

| Event | Description|
|---|---|
| `chart:rendered` | if the chart object instance rendered |
| `chart:destroyed` | if the chart object instance removed |
| `chart:updated` | if the update handler performs an update instead of a re-render |
| `labels:updated` | if new labels were set |

## Global Methods

Global Methods need to be imported.

### generateChart

- **Type:** `Function`
- **Arguments**: `chart-id`, `chart-type`, `chart-controller`
- **Usage:**

```js
import { generateChart } from 'vue-chartjs'
import { LineController } from 'chart.js'
// The first argument is the chart-id, the second the chart type, third is the custom controller
const CustomLine = generateChart('custom-line', 'line', LineController)
```
