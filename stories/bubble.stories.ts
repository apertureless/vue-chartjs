import BubbleChart from '../sandboxes/bubble/src/components/bubbleChart'

export default {
  title: 'BubbleChart',
  component: BubbleChart,
  parameters: {
    layout: 'centered'
  }
}

const Template = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { BubbleChart },
  template: '<BubbleChart />'
})

export const DefaultBubble = Template.bind({})

DefaultBubble.args = {
  chartId: 'bubble-chart',
  width: 400,
  height: 400,
  plugins: []
}
