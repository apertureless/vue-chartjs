<template>
  <Bubble
    :chart-options="chartOptions"
    :chart-data="chartData"
    :chart-id="chartId"
    :dataset-id-key="datasetIdKey"
    :plugins="plugins"
    :css-classes="cssClasses"
    :styles="styles"
    :width="width"
    :height="height"
  />
</template>

<script>
import { Bubble } from '../../src/index'

import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LinearScale
} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, PointElement, LinearScale)

export default {
  name: 'BubbleChart',
  components: {
    Bubble
  },
  props: {
    chartId: {
      type: String,
      default: 'bubble-chart'
    },
    datasetIdKey: {
      type: String,
      default: 'label'
    },
    width: {
      type: Number,
      default: 400
    },
    height: {
      type: Number,
      default: 400
    },
    cssClasses: {
      default: '',
      type: String
    },
    styles: {
      type: Object,
      default: () => {}
    },
    plugins: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      chartData: {
        datasets: [
          {
            label: 'Data One',
            backgroundColor: '#f87979',
            data: [
              {
                x: 20,
                y: 25,
                r: 5
              },
              {
                x: 40,
                y: 10,
                r: 10
              },
              {
                x: 30,
                y: 22,
                r: 30
              }
            ]
          },
          {
            label: 'Data Two',
            backgroundColor: '#7C8CF8',
            data: [
              {
                x: 10,
                y: 30,
                r: 15
              },
              {
                x: 20,
                y: 20,
                r: 10
              },
              {
                x: 15,
                y: 8,
                r: 30
              }
            ]
          }
        ]
      },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false
      }
    }
  }
}
</script>
