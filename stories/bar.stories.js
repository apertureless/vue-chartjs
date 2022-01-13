import BarChart from '../sandboxes/bar/src/components/barChart.vue'

export default {
  title: 'BarChart',
  component: BarChart,
  parameters: {
    layout: 'centered'
  }
}

const Template = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { BarChart },
  template: '<BarChart />'
})

export const DefaultBar = Template.bind({})

DefaultBar.args = {
  chartId: 'bar-chart',
  width: 400,
  height: 400,
  plugins: []
}
