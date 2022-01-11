<template>
  <reactive-chart
    :chart-id="chartId"
    :width="width"
    :height="height"
    :css-classes="cssClasses"
    :styles="styles"
    :plugins="plugins"
  />
</template>

<script>
import ReactiveChart from './reactiveChart.vue'

export default {
  name: 'ReactivePage',
  components: {
    ReactiveChart
  },
  props: {
    chartId: {
      type: String,
      default: ''
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
  }
}
</script>
