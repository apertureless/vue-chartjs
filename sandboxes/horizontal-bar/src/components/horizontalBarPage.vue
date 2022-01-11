<template>
  <horizontal-bar-chart
    :chart-id="chartId"
    :width="width"
    :height="height"
    :css-classes="cssClasses"
    :styles="styles"
    :plugins="plugins"
  />
</template>

<script>
import HorizontalBarChart from './horizontalBarChart.vue'

export default {
  name: 'HorizontalBarPage',
  components: {
    HorizontalBarChart
  },
  props: {
    chartId: {
      type: String,
      default: 'horizontalbar-chart'
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
