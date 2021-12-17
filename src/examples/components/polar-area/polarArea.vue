<template>
  <polar-area-example
    :chart-id="chartId"
    :width="width"
    :height="height"
    :css-classes="cssClasses"
    :styles="styles"
    :plugins="plugins"
  />
</template>

<script>
import PolarAreaExample from './PolarAreaExample'

export default {
  name: 'PolarAreaChart',
  components: {
    PolarAreaExample,
  },
  props: {
    chartId: {
      type: String,
      default: 'polar-chart',
    },
    width: {
      type: Number,
      default: 400,
    },
    height: {
      type: Number,
      default: 400,
    },
    cssClasses: {
      default: '',
      type: String,
    },
    styles: {
      type: Object,
      default: () => {},
    },
    plugins: {
      type: Array,
      default: () => {},
    },
  },
}
</script>
