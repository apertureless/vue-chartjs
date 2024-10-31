
# Examples

## Chart with props

Your goal should be to create reusable chart components. For this purpose, you should utilize Vue.js props to pass in chart options and chart data. This way, the parent component itself does not hold an opinion about fetching data and is only for presentation.

```vue
<template>
  <Bar :data="chartData" :options="chartOptions" />
</template>

<script>
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default {
  name: 'BarChart',
  components: { Bar },
  props: {
    chartData: {
        type: Object,
        required: true
      },
    chartOptions: {
      type: Object,
      default: () => {}
    }
  }
}
</script>
```

## Chart with local data

You can handle your chart data directly in your parent component.

```vue
<template>
  <Bar :data="chartData" />
</template>

<script>
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default {
  name: 'BarChart',
  components: { Bar },
  data() {
    return {
      chartData: {
        labels: [ 'January', 'February', 'March'],
        datasets: [
          {
            label: 'Data One',
            backgroundColor: '#f87979',
            data: [40, 20, 12]
          }
        ]
      }
    }
  }
}
</script>
```

## Chart with API data

A common pattern is to use an API to retrieve your data. However, there are some things to keep in mind. The most common problem is that you mount your chart component directly and pass in data from an asynchronous API call. The problem with this approach is that Chart.js tries to render your chart and access the chart data synchronously, so your chart mounts before the API data arrives.

To prevent this, a simple `v-if` is the best solution.

Create your chart component with a data prop and options prop, so we can pass in our data and options from a container component.

```vue
<template>
  <div class="container">
    <Bar v-if="loaded" :data="chartData" />
  </div>
</template>

<script>
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default {
  name: 'BarChart',
  components: { Bar },
  data: () => ({
    loaded: false,
    chartData: null
  }),
  async mounted () {
    this.loaded = false

    try {
      const { userlist } = await fetch('/api/userlist')
      this.chartdata = userlist

      this.loaded = true
    } catch (e) {
      console.error(e)
    }
  }
}
</script>
```

## Chart with dynamic styles

You can set `responsive: true` and pass in a styles object which gets applied as inline styles to the outer `<div>`. This way, you can change the height and width of the outer container dynamically, which is not the default behaviour of Chart.js. It is best to use computed properties for this.

::: warning
 You need to set `position: relative`
:::

```vue
<template>
  <div>
    <Bar :style="myStyles"/>
  </div>
</template>

<script>
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default {
  name: 'BarChart',
  components: { Bar },
  computed: {
    myStyles () {
      return {
        height: `${/* mutable height */}px`,
        position: 'relative'
      }
    }
  }
}
</script>
```

## Custom / New Charts

Sometimes you need to extend the default Chart.js charts. There are a lot of [examples](http://www.chartjs.org/docs/latest/developers/charts.html) on how to extend and modify the default charts. Or, you can create your own chart type.

In `vue-chartjs`, you can do this pretty much the same way:

```js
// 1. Import Chart.js so you can use the global Chart object
import { Chart } from 'chart.js'
// 2. Import the `createTypedChart()` method to create the vue component.
import { createTypedChart } from 'vue-chartjs'
// 3. Import needed controller from Chart.js
import { LineController } from 'chart.js'

// 3. Extend one of the default charts
// http://www.chartjs.org/docs/latest/developers/charts.html
class LineWithLineController extends LineController { /* custom magic here */}

// 4. Generate the vue-chartjs component
// The first argument is the chart-id, the second the chart type, third is the custom controller
const CustomLine = createTypedChart('line', LineWithLineController)

// 5. Extend the CustomLine Component just like you do with the default vue-chartjs charts.

export default {
  components: { CustomLine }
}
```

## Resources

Here are some resources, such as tutorials, on how to use `vue-chartjs`:

- [Using vue-chartjs with WordPress](https://medium.com/@apertureless/wordpress-vue-and-chart-js-6b61493e289f)
- [Create stunning Charts with Vue and Chart.js](https://hackernoon.com/creating-stunning-charts-with-vue-js-and-chart-js-28af584adc0a)
- [Let’s Build a Web App with Vue, Chart.js and an API Part I](https://hackernoon.com/lets-build-a-web-app-with-vue-chart-js-and-an-api-544eb81c4b44)
- [Let’s Build a Web App with Vue, Chart.js and an API Part II](https://hackernoon.com/lets-build-a-web-app-with-vue-chart-js-and-an-api-part-ii-39781b1d5acf)
- [Build a realtime chart with VueJS and Pusher](https://blog.pusher.com/build-realtime-chart-with-vuejs-pusher/)
