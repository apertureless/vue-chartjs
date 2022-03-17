import PieChart from '../sandboxes/pie/src/components/pieChart'

export default {
  title: 'PieChart',
  component: PieChart,
  parameters: {
    layout: 'centered'
  }
}

const Template = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { PieChart },
  template: '<PieChart />'
})

export const DefaultPie = Template.bind({})

DefaultPie.args = {
  chartId: 'pie-chart',
  width: 400,
  height: 400,
  plugins: []
}
