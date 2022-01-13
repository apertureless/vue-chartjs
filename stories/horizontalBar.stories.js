import HorizontalBarChart from '../sandboxes/horizontal-bar/src/components/horizontalBarChart.vue'

export default {
  title: 'HorizontalBarChart',
  component: HorizontalBarChart,
  parameters: {
    layout: 'centered'
  }
}

const Template = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { HorizontalBarChart },
  template: '<HorizontalBarChart />'
})

export const DefaultHorizontalBar = Template.bind({})

DefaultHorizontalBar.args = {
  chartId: 'horizontal-bar-chart',
  width: 400,
  height: 400,
  plugins: []
}
