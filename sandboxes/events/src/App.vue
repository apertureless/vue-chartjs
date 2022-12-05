<template>
  <Chart
    ref="chartRef"
    type="bar"
    :data="data"
    :options="options"
    @click="onClick"
  />
</template>

<script lang="ts">
import { ref } from 'vue'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  InteractionItem
} from 'chart.js'
import {
  ChartComponentRef,
  Chart,
  getDatasetAtEvent,
  getElementAtEvent,
  getElementsAtEvent
} from 'vue-chartjs'
import * as chartConfig from './chartConfig.js'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

export default {
  name: 'App',
  components: {
    Chart
  },
  setup() {
    const datasetAtEvent = (dataset: InteractionItem[]) => {
      if (!dataset.length) return

      const datasetIndex = dataset[0].datasetIndex

      console.log('dataset', chartConfig.data.datasets[datasetIndex].label)
    }

    const elementAtEvent = (element: InteractionItem[]) => {
      if (!element.length) return

      const { datasetIndex, index } = element[0]

      console.log(
        'element',
        chartConfig.data.labels[index],
        chartConfig.data.datasets[datasetIndex].data[index]
      )
    }

    const elementsAtEvent = (elements: InteractionItem[]) => {
      if (!elements.length) return

      console.log('elements', elements)
    }

    const chartRef = ref<ChartComponentRef>(null)

    const onClick = (event: MouseEvent) => {
      const {
        value: { chart }
      } = chartRef

      if (!chart) {
        return
      }

      datasetAtEvent(getDatasetAtEvent(chart, event))
      elementAtEvent(getElementAtEvent(chart, event))
      elementsAtEvent(getElementsAtEvent(chart, event))
    }

    return {
      chartRef,
      onClick,
      ...chartConfig
    }
  }
}
</script>
