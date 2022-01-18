import CustomChart from '../sandboxes/custom/src/components/customChart.vue'

export default {
  title: 'CustomChart',
  component: CustomChart,
  parameters: {
    layout: 'centered'
  }
}

const Template = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { CustomChart },
  template: '<CustomChart />'
})

export const DefaultCustom = Template.bind({})

DefaultCustom.args = {
  chartId: 'custom-chart',
  width: 400,
  height: 400,
  plugins: []
}
