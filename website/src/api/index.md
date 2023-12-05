# Coding Reference

## Props

Some basic props are defined in the components provided by `vue-chartjs`.

| Prop | Description |
|---|---|
| data | Data object that is passed into the Chart.js chart |
| options | Options object that is passed into the Chart.js chart |
| datasetIdKey | Key name to identify the dataset |
| plugins | Plugins array that is passed into the Chart.js chart |
| updateMode | Mode string to indicate the transition configuration to be used. |
| ariaLabel | An [ARIA label](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-label) that describes the chart to make it accessible. |
| ariaDescribedby | A reference to the [describing element](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-describedby). E. g. a table representation of the data. |

The rest of the props will fall through to the canvas element.

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
