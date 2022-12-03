import 'chart.js/auto'
import { ref, onMounted } from 'vue'
import { Bar } from '../src'
import * as reactiveChartConfig from '../sandboxes/reactive/src/chartConfig'

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
