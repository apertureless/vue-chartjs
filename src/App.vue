<template>
  <div class="container">
    <bar-example :width="100" :height="200" :player={wins:'12'} :opponent={wins:'23'}></bar-example>
  </div>
</template>

<script>
  import BarExample from './examples/BarExample'

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
