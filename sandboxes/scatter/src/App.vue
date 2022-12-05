<template>
  <Scatter :data="data" :options="options" />
</template>

<script lang="ts">
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
} from 'chart.js'
import { Scatter } from 'vue-chartjs'
import * as chartConfig from './chartConfig.js'

ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Legend)

export default {
  name: 'App',
  components: {
    Scatter
  },
  data() {
    return chartConfig
  }
}
</script>
