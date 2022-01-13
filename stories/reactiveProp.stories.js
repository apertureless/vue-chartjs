import ReactivePropChart from '../sandboxes/reactive-prop/src/components/reactivePropChart.vue'

export default {
  title: 'ReactivePropChart',
  component: ReactivePropChart,
  parameters: {
    layout: 'centered'
  }
}

const Template = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { ReactivePropChart },
  template: '<ReactivePropChart :chart-data="dataPoints" />',
  data() {
    return {
      dataPoints: {}
    }
  },
  mounted() {
    setInterval(() => {
      this.fillData()
    }, 2000)
  },
  methods: {
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
})

export const DefaultReactiveProp = Template.bind({})

DefaultReactiveProp.args = {
  chartId: 'reactive-prop-chart',
  width: 400,
  height: 400,
  plugins: []
}
