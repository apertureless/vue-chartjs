<template>
  <bubble-example
    :chart-id="chartId"
    :width="width"
    :height="height"
    :css-classes="cssClasses"
    :styles="styles"
    :plugins="plugins"
  />
</template>

<script>
import BubbleExample from './BubbleExample'

export default {
  name: 'BubbleChart',
  components: {
    BubbleExample,
  },
  props: {
    chartId: {
      type: String,
      default: 'bubble-chart',
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
