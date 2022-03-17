import PolarAreaChart from '../sandboxes/polar-area/src/components/polarAreaChart'

export default {
  title: 'PolarAreaChart',
  component: PolarAreaChart,
  parameters: {
    layout: 'centered'
  }
}

const Template = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { PolarAreaChart },
  template: '<PolarAreaChart />'
})

export const DefaultPolarArea = Template.bind({})

DefaultPolarArea.args = {
  chartId: 'polar-area-chart',
  width: 400,
  height: 400,
  plugins: []
}
