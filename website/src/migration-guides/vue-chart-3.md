
# Migration from vue-chart-3

## Uninstall vue-chart-3

```bash
pnpm rm vue-chart-3
# or
yarn remove vue-chart-3
# or
npm uninstall vue-chart-3
```

## Install vue-chartjs

```bash
pnpm add vue-chartjs
# or
yarn add vue-chartjs
# or
npm i vue-chartjs
```

## Change component import path

For Vue 2.7 and Vue 3 projects:

```javascript
import { /* component */ } from 'vue-chartjs'
```

For Vue 2 (<2.7) projects:

```javascript
import { /* component */ } from 'vue-chartjs/legacy'
```

## Rename components

- BarChart to Bar
- DoughnutChart to Doughnut
- LineChart to Line
- PieChart to Pie
- PolarAreaChart to PolarArea
- RadarChart to Radar
- BubbleChart to Bubble
- ScatterChart to Scatter

## Rename props

- options to chartOptions
