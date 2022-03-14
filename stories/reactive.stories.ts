import ReactiveChart from '../sandboxes/reactive/src/components/reactiveChart'

export default {
  title: 'ReactiveChart',
  component: ReactiveChart,
  parameters: {
    layout: 'centered'
  }
}

const Template = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { ReactiveChart },
  template: '<ReactiveChart />'
})

export const DefaultReactive = Template.bind({})

DefaultReactive.args = {
  chartId: 'reactive-chart',
  width: 400,
  height: 400,
  plugins: []
}
