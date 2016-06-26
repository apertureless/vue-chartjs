<template>
  <div class="container">
    <bar-example :width="100" :height="200" :player={wins:'12'} :opponent={wins:'23'}></bar-example>
    <line-example></line-example>
  </div>
</template>

<script>
  import BarExample from './examples/BarExample'
  import LineExample from './examples/LineExample'

  export default {
    components: { BarExample, LineExample }
  }
</script>

<style>
  .container {
    max-width: 800px;
    margin: 0 auto;
  }
</style>
