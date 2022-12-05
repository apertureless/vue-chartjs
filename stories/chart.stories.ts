import 'chart.js/auto'
import type { InteractionItem } from 'chart.js'
import { ref } from 'vue'
import {
  ChartComponentRef,
  Chart,
  getDatasetAtEvent,
  getElementAtEvent,
  getElementsAtEvent
} from '../src/index.js'
import * as barChartConfig from '../sandboxes/bar/src/chartConfig.js'

export default {
  title: 'Chart',
  component: Chart,
  parameters: {
    layout: 'centered'
  }
}

export function Default(args) {
  return {
    components: { Chart },
    template: '<Chart v-bind="args" />',
    setup() {
      return { args }
    }
  }
}

Default.args = {
  id: 'bar-chart',
  type: 'bar',
  width: 400,
  height: 400,
  ...barChartConfig
}

export function Events(args) {
  return {
    components: { Chart },
    template: '<Chart ref="chartRef" @click="onClick" v-bind="args" />',
    setup() {
      const datasetAtEvent = (dataset: InteractionItem[]) => {
        if (!dataset.length) return

        const datasetIndex = dataset[0].datasetIndex

        console.log('dataset', barChartConfig.data.datasets[datasetIndex].label)
      }

      const elementAtEvent = (element: InteractionItem[]) => {
        if (!element.length) return

        const { datasetIndex, index } = element[0]

        console.log(
          'element',
          barChartConfig.data.labels[index],
          barChartConfig.data.datasets[datasetIndex].data[index]
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
        args,
        onClick
      }
    }
  }
}

Events.args = {
  id: 'bar-chart',
  type: 'bar',
  width: 400,
  height: 400,
  ...barChartConfig
}
