<template>
  <div class="container">
    <bar-example></bar-example>
  </div>
</template>

<script>
  import BarExample from './examples/BarChartExample'

  export default {
    components: { BarExample }
  }
</script>

<style>
  .container {
    max-width: 800px;
    margin: 0 auto;
  }
</style>
