import { defineComponent, h, PropType } from 'vue'
import { Bar } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  PluginOptionsByType,
  ChartData,
  DefaultDataPoint
} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default defineComponent({
  name: 'ReactiveChart',
  components: {
    Bar
  },
  props: {
    chartData: {
      type: Object as PropType<
        ChartData<'bar', DefaultDataPoint<'bar'>, unknown>
      >,
      required: true
    },
    chartId: {
      type: String,
      default: 'bar-chart'
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
      type: Object as PropType<Partial<CSSStyleDeclaration>>,
      default: () => {}
    },
    plugins: {
      type: Object as PropType<PluginOptionsByType<'bar'>>,
      default: () => {}
    }
  },
  setup(props) {
    const chartOptions = {
      responsive: true,
      maintainAspectRatio: false
    }

    return () =>
      h(Bar, {
        chartData: props.chartData,
        chartOptions,
        chartId: props.chartId,
        width: props.width,
        height: props.height,
        cssClasses: props.cssClasses,
        styles: props.styles,
        plugins: props.plugins
      })
  }
})
