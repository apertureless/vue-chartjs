<template>
  <Bubble :data="data" :options="options" />
</template>

<script lang="ts">
import {
  Chart as ChartJS,
  Tooltip,
  Legend,
  PointElement,
  LinearScale
} from 'chart.js'
import { Bubble } from 'vue-chartjs'
import * as chartConfig from './chartConfig.js'

ChartJS.register(LinearScale, PointElement, Tooltip, Legend)

export default {
  name: 'App',
  components: {
    Bubble
  },
  data() {
    return chartConfig
  }
}
</script>
