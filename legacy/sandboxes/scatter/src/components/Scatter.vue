<template>
  <Scatter
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
import { Scatter } from 'vue-chartjs/legacy'

import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  CategoryScale,
  PointElement,
  LinearScale
} from 'chart.js'

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  CategoryScale,
  PointElement,
  LinearScale
)

export default {
  name: 'ScatterChart',
  components: {
    Scatter
  },
  props: {
    chartId: {
      type: String,
      default: 'scatter-chart'
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
            label: 'Scatter Dataset 1',
            fill: false,
            borderColor: '#f87979',
            backgroundColor: '#f87979',
            data: [
              {
                x: -2,
                y: 4
              },
              {
                x: -1,
                y: 1
              },
              {
                x: 0,
                y: 0
              },
              {
                x: 1,
                y: 1
              },
              {
                x: 2,
                y: 4
              }
            ]
          },
          {
            label: 'Scatter Dataset 2',
            fill: false,
            borderColor: '#7acbf9',
            backgroundColor: '#7acbf9',
            data: [
              {
                x: -2,
                y: -4
              },
              {
                x: -1,
                y: -1
              },
              {
                x: 0,
                y: 1
              },
              {
                x: 1,
                y: -1
              },
              {
                x: 2,
                y: -4
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
