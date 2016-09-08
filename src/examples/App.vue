<template>
  <div class="container">
    <bar-example></bar-example>
    <line-example></line-example>
    <doughnut-example></doughnut-example>
    <pie-example></pie-example>
    <radar-example></radar-example>
    <polar-area-example></polar-area-example>
    <bubble-example></bubble-example>
  </div>
</template>

<script>
  import BarExample from './BarExample'
  import LineExample from './LineExample'
  import DoughnutExample from './DoughnutExample'
  import PieExample from './PieExample'
  import RadarExample from './RadarExample'
  import PolarAreaExample from './PolarAreaExample'
  import BubbleExample from './BubbleExample'

  export default {
    components: {
      BarExample,
      LineExample,
      DoughnutExample,
      PieExample,
      RadarExample,
      PolarAreaExample,
      BubbleExample
    }
  }
</script>

<style>
  .container {
    max-width: 800px;
    margin: 0 auto;
  }
</style>
