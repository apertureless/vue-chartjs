import { describe, it, expect } from 'vitest'
import { defineComponent, nextTick, ref } from 'vue'
import { mount } from '@vue/test-utils'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement
} from 'chart.js'
import { Line } from '../src/index.js'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement)

function mountLine(data: ReturnType<typeof ref>) {
  const Parent = defineComponent({
    components: { Line },
    setup() {
      return {
        data,
        options: { responsive: false, animation: false }
      }
    },
    template: '<Line ref="chart" :data="data" :options="options" />'
  })

  const wrapper = mount(Parent)
  const exposed = (
    wrapper.vm.$refs.chart as { chart: ChartJS | { value: ChartJS | null } }
  ).chart
  const chart = 'value' in exposed ? exposed.value : exposed

  return { wrapper, chart }
}

describe('reactive chart data', () => {
  it('updates when a point is pushed into a dataset', async () => {
    const data = ref({
      labels: ['a'],
      datasets: [
        {
          label: 'A',
          backgroundColor: 'red',
          data: [1]
        }
      ]
    })

    const { chart } = mountLine(data)

    data.value.datasets[0].data.push(2)
    data.value.labels.push('b')

    await nextTick()
    await nextTick()

    expect(chart).toBeTruthy()
    expect(chart!.data.datasets[0].data).toEqual([1, 2])
    expect(chart!.data.labels).toEqual(['a', 'b'])
  })

  it('updates when the data object is replaced', async () => {
    const data = ref({
      labels: ['a'],
      datasets: [{ label: 'A', backgroundColor: 'red', data: [1] }]
    })

    const { chart } = mountLine(data)

    data.value = {
      labels: ['a', 'b'],
      datasets: [{ label: 'A', backgroundColor: 'red', data: [1, 2] }]
    }

    await nextTick()
    await nextTick()

    expect(chart!.data.datasets[0].data).toEqual([1, 2])
    expect(chart!.data.labels).toEqual(['a', 'b'])
  })
})
