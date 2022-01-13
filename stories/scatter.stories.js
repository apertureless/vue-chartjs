import ScatterChart from '../sandboxes/scatter/src/components/scatterChart.vue'

export default {
  title: 'ScatterChart',
  component: ScatterChart,
  parameters: {
    layout: 'centered'
  }
}

const Template = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { ScatterChart },
  template: '<ScatterChart />'
})

export const DefaultScatter = Template.bind({})

DefaultScatter.args = {
  chartId: 'scatter-chart',
  width: 400,
  height: 400,
  plugins: []
}
