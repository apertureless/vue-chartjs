import DoughnutChart from '../sandboxes/doughnut/src/components/doughnutChart.vue'

export default {
  title: 'DoughnutChart',
  component: DoughnutChart,
  parameters: {
    layout: 'centered'
  }
}

const Template = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { DoughnutChart },
  template: '<DoughnutChart />'
})

export const DefaultDoughnut = Template.bind({})

DefaultDoughnut.args = {
  chartId: 'doughnut-chart',
  width: 400,
  height: 400,
  plugins: []
}
