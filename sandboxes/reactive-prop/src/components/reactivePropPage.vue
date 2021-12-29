<template>
  <reactive-prop-chart
    :chart-id="chartId"
    :width="width"
    :height="height"
    :css-classes="cssClasses"
    :styles="styles"
    :plugins="plugins"
  />
</template>

<script>
import ReactivePropChart from './reactivePropChart.vue'

export default {
  name: 'ReactivePropPage',
  components: {
    ReactivePropChart
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
  },
  data() {
    return {
      dataPoints: {}
    }
  }
}
</script>
