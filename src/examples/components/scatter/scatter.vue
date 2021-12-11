<template>
  <scatter-example
    :chart-id="chartId"
    :width="width"
    :height="height"
    :css-classes="cssClasses"
    :styles="styles"
    :plugins="plugins"
  />
</template>

<script>
import ScatterExample from "./ScatterExample";

export default {
  name: "ScatterChart",
  components: {
    ScatterExample,
  },
  props: {
    chartId: {
      type: String,
      default: "",
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
      default: "",
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
