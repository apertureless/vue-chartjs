import RadarChart from '../sandboxes/radar/src/components/radarChart'

export default {
  title: 'RadarChart',
  component: RadarChart,
  parameters: {
    layout: 'centered'
  }
}

const Template = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { RadarChart },
  template: '<RadarChart />'
})

export const DefaultRadar = Template.bind({})

DefaultRadar.args = {
  chartId: 'radar-chart',
  width: 400,
  height: 400,
  plugins: []
}
