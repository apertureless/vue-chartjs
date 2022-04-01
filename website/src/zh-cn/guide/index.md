# 起步

**vue-chartjs** 是 Vue 对于 [Chart.js](https://github.com/chartjs/Chart.js) 的封装. 你可以很简单的创建可复用的图表组件.

## 介绍

`vue-chartjs` 让你在 Vue 中能更好的使用 Chart.js . 非常适合想要尽快启动和运行简单图表的人

它抽象了一些简单的逻辑,  但是也暴露了 Chart.js 对象, 提供了极大的灵活性.

## 安装

### NPM

你可以在 `npm` 下安装 `vue-chartjs`. 当然, 你也需要在项目中安装 `chart.js` 依赖. 因为 `Chart.js` 是一个 [peerDependency](https://docs.npmjs.com/files/package.json#peerdependencies). 这种方式你可以完全控制 Chart.js 的版本

`yarn add vue-chartjs chart.js` or `npm install vue-chartjs chart.js --save`

::: tip
如果你使用的是 vue 1.x 版本, 请使用 `legacy` 标签. 然而, Vue 1 所支持的版本不再维护了.

`yarn add vue-chartjs@legacy`
:::

### 浏览器

你也可以直接在浏览器中使用 `vue-chartjs`.
先添加 `Chart.js` 脚本, 再添加 `vue-chartjs` 脚本.

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.7.1/Chart.min.js"></script>
<script src="https://unpkg.com/vue-chartjs/dist/vue-chartjs.min.js"></script>
```
## 整合

`Chart.js` 将所有可用的图表类型, 都导出为命名组件, 并可以直接导入它们. 这些组件都是普通的 Vue 组件, 然而, 你需要`扩展`它.

`vue-chartjs` 的想法是提供容易使用的组件, 并且具有最大限度的灵活性和扩展性. 要实现这一点, 你需要创建你自己的 *Chart Component* 并通过 `vue-chartjs` 提供的组件来扩展它.

这样，Chart组件中的方法和逻辑就可以合并到您自己的图表组件中.

## 创建你自己的第一个图表

你需要引入一个基本图表然后扩展它. 这为处理不同数据时提供了更大的灵活性. 你可以封装你的组件以及使用props来处理数据, 或者你可以直接在组件里输入他们. 当然, 如果那样做, 你的组件就无法复用了.

你可以引入整个项目或者每个模块单独引用. 之后你需要使用`extends:`或者 `mixins:[]`. 然后在 `mounted()` 中调用 `this.renderChart()`. 这将创建你的图表实例.

```js{1,4,6}
import { Bar } from 'vue-chartjs'

export default {
  extends: Bar,
  mounted () {
    this.renderChart(data, options)
  }
}
```

:::tip
你可以使用 `extends: Bar` 或者 `mixins: [Bar]`
:::

`this.renderChart()` 方法由 `Bar` 组件提供, 接收两个对象参数.第一个是你的图表数据, 第二个是配置对象.

在这个文档中查看你需要提供的对象结构 [Chart.js docs](http://www.chartjs.org/docs/latest/#creating-a-chart) .

### Vue 单文件组件

文档中很多例子都是基于javascript文件 而不是 `.vue` 文件. 这是因为你大多数只需要`<script>`.当然在 `.vue` 文件中你也能用的很好.

**Chart.vue**

```html
<script>
import { Line } from 'vue-chartjs'

export default {
  extends: Line,
  props: ['chartdata', 'options'],
  mounted () {
    this.renderChart(this.chartdata, this.options)
  }
}
</script>

<style>
</style>
```

::: danger 不要使用Template标签
不要在你的 `.vue` 文件中引入 `<template>` 标签. Vue **无法** 合并模板.如果你添加了一个空的 `<template>` 标签, Vue 将会从你的主键里获取模板, 而不会从你 `extend` 中获取, 这将导致页面为空并报错.
:::

## 更新 Charts

如果你修改了数据集, Chart.js 是不会提供实时更新的. 当然,  `vue-chartjs` 提供了两个 mixins 来实现.

- `reactiveProp`
- `reactiveData`

这两个mixins其实实现的是相同的功能. 大多数时间你将会使用`reactiveProp`. 它扩展了图表组件的逻辑, 并自动创建名为 `chartData` 的`props`参数, 并为这个参数添加`vue watch`. 当数据改变, 如果数据在数据集中改变, 它将调用`update()`; 如果添加了新的数据集, 它将调用`renderChart()`.

`reactiveData` 创建一个本地的`chartData`变量, 不是`props`参数! 以及创建一个对这个变量的 `watcher`. 如果你需要单一目的的图表, 以及在图表组件中进行API调用的时候, 这将非常有用.

### 例子

**LineChart.js**
```javascript
import { Line, mixins } from 'vue-chartjs'
const { reactiveProp } = mixins

export default {
  extends: Line,
  mixins: [reactiveProp],
  props: ['options'],
  mounted () {
    // this.chartData 在 mixin 创建.
    // 如果你需要替换 options , 请创建本地的 options 对象
    this.renderChart(this.chartData, this.options)
  }
}
```

**RandomChart.vue**

```html
<template>
  <div class="small">
    <line-chart :chart-data="datacollection"></line-chart>
    <button @click="fillData()">Randomize</button>
  </div>
</template>

<script>
  import LineChart from './LineChart.js'

  export default {
    components: {
      LineChart
    },
    data () {
      return {
        datacollection: null
      }
    },
    mounted () {
      this.fillData()
    },
    methods: {
      fillData () {
        this.datacollection = {
          labels: [this.getRandomInt(), this.getRandomInt()],
          datasets: [
            {
              label: 'Data One',
              backgroundColor: '#f87979',
              data: [this.getRandomInt(), this.getRandomInt()]
            }, {
              label: 'Data One',
              backgroundColor: '#f87979',
              data: [this.getRandomInt(), this.getRandomInt()]
            }
          ]
        }
      },
      getRandomInt () {
        return Math.floor(Math.random() * (50 - 5 + 1)) + 5
      }
    }
  }
</script>

<style>
  .small {
    max-width: 600px;
    margin:  150px auto;
  }
</style>
```

::: danger 限制

[Caveats](https://vuejs.org/v2/guide/list.html#Caveats)
[Change-Detection-Caveats](https://vuejs.org/v2/guide/reactivity.html#Change-Detection-Caveats)
[vm.$watch](https://vuejs.org/v2/api/#vm-watch)

:::


### 事件

如果你的数据改变, 响应式的 mixins 将会触发事件. 你能监听他们通过在图表组件上使用 `v:on`. 下列是可用的事件:

- `chart:render` - 如果 mixin 执行完全重绘
- `chart:destroy` - 如果 mixin 删除图表对象实例
- `chart:update` - 如果 mixin 执行更新而不是重绘
- `labels:update` - 如果设置了新的labels
- `xlabels:update` 如果设置了新的xLabels
- `ylabels:update` - 如果设置了新的yLabels


### 故障排查

响应式系统, 它当前状态是**不健全的**. 你将会遇到一些问题, 因为有很多用例和方式来传递你的数据.

#### Options

`options` 对象不是响应式的. 所以如果你动态改变图表的配置, 他们将无法被 mixin 识别.

如果你正在使用 mixin , 你需要使用`options`来传递你的配置. 这是非常重要的, 因为 mixin 将调用 chart.js 的 `update()` 方法 或者 销毁并渲染一个新的图表. 如果 mixin 渲染一个新的图表, 它将调用`this.renderChart(this.chartData, this.options)`.

但是如果你在`mounted()`传递你的配置, 它们将直接被遗弃.

::: danger 错误的方式
```js {7}
import { Line, mixins } from 'vue-chartjs'

export default {
  components: { Line }
  mixins: [mixins.reactiveProp],
  mounted () {
    this.renderChart(this.chartData, {responsive: true})
  }
}
```
:::

::: tip 正确的方式
```js {7}
import { Line, mixins } from 'vue-chartjs'

export default {
  components: { Line }
  mixins: [mixins.reactiveProp],
  mounted () {
    this.renderChart(this.chartData, this.options)
  }
}
```

:::

#### 自己的监视器

如果你对你的数据进行大量更改(而不是推新的数据), 那么最好的方式是创建自己的 watcher.
你可以自己调用 `this.$data._chart.update()` 或者 `this.renderChart()` 来实现, 当然这些完全取决于你自己.

一个简单的监视器将会是这样:

```js
watch: {
  chartData () {
    this.$data._chart.update()
  }
}
```

## 例子

### 使用props的图表

你的目标因该是创建可复用的图表组件. 出于这个目的, 你应该利用 Vue.js 的`props` 来传递你的配置和图表数据. 这种方式, 图表自己不用关心, 关于提取数据, 只用来展示.

首先, 创建你的组件

```js
import { Line } from 'vue-chartjs'

export default {
  extends: Line,
  props: {
    chartdata: {
      type: Object,
      default: null
    },
    options: {
      type: Object,
      default: null
    }
  },
  mounted () {
    this.renderChart(this.chartdata, this.options)
  }
}
```

然后, 你可以把你的组件添加到父组件里

```html
<line-chart :chartdata="chartData" :options="chartOptions"/>
```

### 图表使用本地数据

你可以直接在你自己的图表组件里处理你的图表数据. 你只需要把它传递到 `renderChart()`.

```js
import { Bar } from 'vue-chartjs'

export default {
  extends: Bar,
  data: () => ({
    chartdata: {
      labels: ['January', 'February'],
      datasets: [
        {
          label: 'Data One',
          backgroundColor: '#f87979',
          data: [40, 20]
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false
    }
  }),

  mounted () {
    this.renderChart(this.chartdata, this.options)
  }
}
```

### Chart使用API的数据

使用API获取数据是一种常见模式. 然而, 这里有一些问题需要记住. 最常见的问题是, 你直接安装你的图表, 将异步API回调的数据传递进去. 这种方法导致的问题是, chart.js 试图去渲染你的图表, 访问图表数据, 但是你的API回调是异步的. 所以你图表在你数据到达前安装.

防止这个问题, 一个 `v-if` 即可.

创建你的图表组件通过一个数据参数和一个配置参数, 所以我们可以从一个容器组件中传递我们的数据和配置.

**Chart.vue**

```js
import { Line } from 'vue-chartjs'

export default {
  extends: Line,
  props: {
    chartdata: {
      type: Object,
      default: null
    },
    options: {
      type: Object,
      default: null
    }
  },
  mounted () {
    this.renderChart(this.chartdata, this.options)
  }
}
```

然后创建一个容器组件, 用来处理你的API回调和vuex连接.
**ChartContainer.vue**

```html {4}
<template>
  <div class="container">
    <line-chart
      v-if="loaded"
      :chartdata="chartdata"
      :options="options"/>
  </div>
</template>

<script>
import LineChart from './Chart.vue'

export default {
  name: 'LineChartContainer',
  components: { LineChart },
  data: () => ({
    loaded: false,
    chartdata: null
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

### Chart的动态样式

你可以设置 `responsive: true` 然后传递到 styles 对象, 这被当做内联样式应用于外层div. 这种方式你可以动态改变外层容器的高度和宽度, 这并不是chart.js 的默认行为. 使用计算属性可以很好的完成.

::: warning
 你需要设置 `position: relative`
:::

```html
<template>
  <div>
    <line-chart :styles="myStyles"/>
    <button @click="increase()">Increase height</button>
  </div>
</template>

<script>
export default {
  data () {
    return {
      height: 300
    }
  },
  methods: {
    increase () {
     this.height += 10
    }
  },
  computed: {
    myStyles () {
      return {
        height: `${this.height}px`,
        position: 'relative'
      }
    }
  }
}
</script>
```

### 自定义/新的图表

有时候你需要扩展Chart.js默认的图表. 这里有许多[例子](http://www.chartjs.org/docs/latest/developers/charts.html), 来教你如何扩展和修改默认的图表, 或者创建自己的图表类型.

在 `vue-chartjs`, 你可以使用同样的方式来做到这一点

```js
// 1. 引入Chart.js, 你可以使用全局的图表对象
import Chart from 'chart.js'
// 2. 引入 `generateChart()`方法创建vue组件.
import { generateChart } from 'vue-chartjs'

// 3. 扩展一个默认图表
// http://www.chartjs.org/docs/latest/developers/charts.html
Chart.defaults.LineWithLine = Chart.defaults.line;
Chart.controllers.LineWithLine = Chart.controllers.line.extend({ /* 自定义 */})

// 4. 生成 vue-chartjs 组件
// 第一个参数是 图表id, 第二个参数是 图表类型.
const CustomLine = generateChart('custom-line', 'LineWithLine')

// 5. 像使用默认的vue-chartjs图表一样, 扩展自定义组件

export default {
  extends: CustomLine,
  mounted () {
    // ....
  }
}
```

## 资源

你可以在这里找到一些资源，比如关于如何使用`vue-chartjs`的教程

- [Using vue-chartjs with WordPress](https://medium.com/@apertureless/wordpress-vue-and-chart-js-6b61493e289f)
- [Create stunning Charts with Vue and Chart.js](https://hackernoon.com/creating-stunning-charts-with-vue-js-and-chart-js-28af584adc0a)
- [Let’s Build a Web App with Vue, Chart.js and an API Part I](https://hackernoon.com/lets-build-a-web-app-with-vue-chart-js-and-an-api-544eb81c4b44)
- [Let’s Build a Web App with Vue, Chart.js and an API Part II](https://hackernoon.com/lets-build-a-web-app-with-vue-chart-js-and-an-api-part-ii-39781b1d5acf)
- [Build a realtime chart with VueJS and Pusher](https://blog.pusher.com/build-realtime-chart-with-vuejs-pusher/)
