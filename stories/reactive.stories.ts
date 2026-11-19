import 'chart.js/auto'
import { ref, onMounted, onUnmounted } from 'vue'
import { Bar, Line } from '../src/index.js'
import * as reactiveChartConfig from '../sandboxes/reactive/src/chartConfig.js'

export default {
  title: 'Reactive',
  component: Bar,
  parameters: {
    layout: 'centered'
  }
}

export function Default(args) {
  return {
    components: { Bar },
    template: '<Bar v-bind="args" :options="options" :data="data" />',
    setup() {
      const options = reactiveChartConfig.options
      const data = ref<any>({
        datasets: []
      })

      onMounted(() => {
        setInterval(() => {
          data.value = reactiveChartConfig.randomData()
        }, 3000)
      })

      return {
        args,
        options,
        data
      }
    }
  }
}

Default.args = {
  id: 'reactive-chart',
  width: 400,
  height: 400
}

// Regression for https://github.com/apertureless/vue-chartjs/issues/1117
export function InPlacePush(args) {
  return {
    components: { Line },
    template: '<Line v-bind="args" :options="options" :data="data" />',
    setup() {
      const data = ref<any>({
        labels: [],
        datasets: [
          {
            backgroundColor: 'red',
            borderColor: 'red',
            showLine: true,
            fill: false,
            pointRadius: 2,
            label: 'A',
            data: [],
            lineTension: 0,
            interpolate: true
          },
          {
            backgroundColor: 'green',
            borderColor: 'green',
            showLine: true,
            fill: false,
            pointRadius: 2,
            label: 'B',
            data: [],
            lineTension: 0,
            interpolate: true
          },
          {
            backgroundColor: 'blue',
            borderColor: 'blue',
            showLine: true,
            fill: false,
            pointRadius: 2,
            label: 'C',
            data: [],
            lineTension: 0,
            interpolate: true
          }
        ]
      })
      const options = {
        scales: {
          x: {
            type: 'linear'
          },
          y: {
            type: 'linear'
          }
        }
      }

      let index = 0
      let intervalId: ReturnType<typeof setInterval>

      onMounted(() => {
        intervalId = setInterval(() => {
          data.value.datasets[0].data.push({ x: index, y: Math.sin(index / 2) })
          data.value.datasets[1].data.push({
            x: index,
            y: Math.cos(index / 3)
          })
          data.value.datasets[2].data.push({
            x: index,
            y: Math.sin(index / 4) * 0.5
          })
          index++
        }, 1000)
      })

      onUnmounted(() => {
        clearInterval(intervalId)
      })

      return {
        args,
        options,
        data
      }
    }
  }
}

InPlacePush.args = {
  id: 'reactive-inplace-chart',
  width: 400,
  height: 400
}
