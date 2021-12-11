<template>
  <reactive-prop-example
    :chart-data="dataPoints"
    :chart-id="chartId"
    :width="width"
    :height="height"
    :css-classes="cssClasses"
    :styles="styles"
    :plugins="plugins"
  />
</template>

<script>
import ReactivePropExample from './ReactivePropExample';

export default {
  name: 'ReactivePropChart',
  components: {
    ReactivePropExample,
  },
  data() {
    return {
      dataPoints: {},
    };
  },
  props: {
    chartId: {
      type: String,
      default: '',
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
    },
    plugins: {
      type: Array,
      default() {
        return [];
      },
    },
  },
};
</script>
