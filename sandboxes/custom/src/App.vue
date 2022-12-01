<template>
  <LineWithLineChart :data="data" :options="options" />
</template>

<script lang="ts">
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'
import LineWithLineChart from './components/LineWithLineChart'
import * as chartConfig from './chartConfig'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

export default {
  name: 'App',
  components: {
    LineWithLineChart
  },
  data() {
    return chartConfig
  }
}
</script>
