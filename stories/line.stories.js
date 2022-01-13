import LineChart from '../sandboxes/line/src/components/lineChart.vue'

export default {
  title: 'LineChart',
  component: LineChart,
  parameters: {
    layout: 'centered'
  }
}

const Template = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { LineChart },
  template: '<LineChart />'
})

export const DefaultLine = Template.bind({})

DefaultLine.args = {
  chartId: 'line-chart',
  width: 400,
  height: 400,
  plugins: []
}
