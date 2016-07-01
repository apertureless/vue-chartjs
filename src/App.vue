<template>
  <div class="container">
    <bar-example></bar-example>
    <line-example></line-example>
    <doughnut-example></doughnut-example>
    <pie-example></pie-example>
  </div>
</template>

<script>
  import BarExample from './examples/BarExample'
  import LineExample from './examples/LineExample'
  import DoughnutExample from './examples/DoughnutExample'
  import PieExample from './examples/PieExample'

  export default {
    components: { BarExample, LineExample, DoughnutExample, PieExample }
  }
</script>

<style>
  .container {
    max-width: 800px;
    margin: 0 auto;
  }
</style>
