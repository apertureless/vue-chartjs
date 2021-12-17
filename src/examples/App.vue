<template>
  <div class="container">
    <div class="Chart">
      <h1 style="text-align: center">Barchart</h1>
      <bar-example />
    </div>

    <div class="Chart">
      <h1 style="text-align: center">Horizontal Barchart</h1>
      <horizontal-bar-example />
    </div>

    <div class="Chart">
      <h1 style="text-align: center">
        Barchart with reactive mixing for live data
      </h1>
      <reactive-example />
    </div>

    <div class="Chart">
      <h1 style="text-align: center">
        Barchart with reactive mixing for live data as props
      </h1>
      <reactive-prop-example :chart-data="dataPoints" />
    </div>

    <div class="Chart">
      <h1 style="text-align: center">Linechart</h1>
      <line-example />
    </div>

    <div class="Chart">
      <h1 style="text-align: center">Doughnutchart</h1>
      <doughnut-example />
    </div>

    <div class="Chart">
      <h1 style="text-align: center">Piechart</h1>
      <pie-example />
    </div>

    <div class="Chart">
      <h1 style="text-align: center">Radarchart</h1>
      <radar-example />
    </div>

    <div class="Chart">
      <h1 style="text-align: center">Polararea</h1>
      <polar-area-example />
    </div>

    <div class="Chart">
      <h1 style="text-align: center">Bubblechart</h1>
      <bubble-example />
    </div>

    <div class="Chart">
      <h1 style="text-align: center">Scatter Chart</h1>
      <scatter-example />
    </div>

    <div class="Chart">
      <h1 style="text-align: center">Custom Line Chart</h1>
      <custom-line />
    </div>
  </div>
</template>

<script>
import BarExample from './components/bar/BarExample'
import LineExample from './components/line/LineExample'
import DoughnutExample from './components/doughnut/DoughnutExample'
import PieExample from './components/pie/PieExample'
import RadarExample from './components/radar/RadarExample'
import PolarAreaExample from './components/polar-area/PolarAreaExample'
import BubbleExample from './components/bubble/BubbleExample'
import ReactiveExample from './components/reactive/ReactiveExample'
import ReactivePropExample from './components/reactive-prop/ReactivePropExample'
import ScatterExample from './components/scatter/ScatterExample'
import HorizontalBarExample from './components/horizontal-bar/HorizontalBarExample'
import CustomLine from './components/custom/CustomExample'

export default {
  components: {
    BarExample,
    LineExample,
    DoughnutExample,
    CustomLine,
    PieExample,
    RadarExample,
    PolarAreaExample,
    BubbleExample,
    ReactiveExample,
    ReactivePropExample,
    ScatterExample,
    HorizontalBarExample
  },
  data() {
    return {
      dataPoints: {},
      height: 20
    }
  },
  computed: {
    myStyles() {
      return {
        height: `${this.height}px`,
        position: 'relative'
      }
    }
  },
  mounted() {
    setInterval(() => {
      this.fillData()
    }, 2000)
  },
  methods: {
    increaseHeight() {
      this.height += 10
    },
    getRandomInt() {
      return Math.floor(Math.random() * (50 - 5 + 1)) + 5
    },
    fillData() {
      this.dataPoints = {
        labels: [
          'January' + this.getRandomInt(),
          'February',
          'March',
          'April',
          'May',
          'June',
          'July',
          'August',
          'September',
          'October',
          'November',
          'December'
        ],
        datasets: [
          {
            label: 'Data One',
            backgroundColor: '#f87979',
            data: [
              this.getRandomInt(),
              this.getRandomInt(),
              this.getRandomInt(),
              this.getRandomInt(),
              this.getRandomInt(),
              this.getRandomInt(),
              this.getRandomInt(),
              this.getRandomInt(),
              this.getRandomInt(),
              this.getRandomInt(),
              this.getRandomInt(),
              this.getRandomInt()
            ]
          }
        ]
      }
    }
  }
}
</script>

<style>
.container {
  max-width: 800px;
  margin: 0 auto;
}

h1 {
  font-family: 'Helvetica', Arial;
  color: #464646;
  text-transform: uppercase;
  border-bottom: 1px solid #f1f1f1;
  padding-bottom: 15px;
  font-size: 28px;
  margin-top: 0;
}

.Chart {
  padding: 20px;
  box-shadow: 0px 0px 20px 2px rgba(0, 0, 0, 0.4);
  border-radius: 20px;
  margin: 50px 0;
}
</style>
