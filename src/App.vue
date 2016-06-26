<template>
  <div class="container">
    <test-chart :width="100" :height="200" :player={wins:'12'} :opponent={wins:'23'}></test-chart>
  </div>
</template>

<script>
  import TestChart from './components/TestChart'

  export default {
    components: { TestChart }
  }
</script>

<style>
  .container {
    max-width: 800px;
    margin: 0 auto;
  }
</style>
