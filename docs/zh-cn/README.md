---
search: zh-cn
---

# vue-chartjs
**vue-chartjs** 是基于 vue 的 [Chart.js](https://github.com/chartjs/Chart.js) 封装。你可以轻松的创建可复用的图表组件。

## 简介
`vue-chartjs` 让你在 vue 中使用 chart.js 省去很多麻烦。非常适合需要快速生成简单图表的人。

它抽象化了基本逻辑但提供了非常灵活的 chart.js 对象。

## 安装
如果你正在使用 Vue.js 2.x 的版本，只需要运行：

`yarn add vue-chartjs chart.js`

如果你正在使用 Vue.js 1.x 的版本，请使用 `legacy` 标签。然而这个版本已经不再维护了。

`yarn add vue-chartjs@legacy`

## 快速开始

你需要引入基本图表并且扩展它。这在处理不同的数据时提供了更多的灵活性。

你可以封装您的组件，并使用 props 来传递数据。或者直接将数据放入组件中，但是这样做组件就不能复用了。

你可以加载整个包或者按需加载。

```javascript
// CommitChart.js
import { Bar } from 'vue-chartjs'

export default {
  extends: Bar,
  mounted () {
    // Overwriting base render method with actual data.
    this.renderChart(data, options)
  }
}
```

你可以给 `renderChart()` 方法传递两个参数：

- Data object
- Options object

### 数据对象

数据对象如下所示：

```javascript
{
  labels: ['January', 'February'],
  datasets: [
    {
      label: 'GitHub Commits',
      backgroundColor: '#f87979',
      data: [40, 20]
    }
  ]
}
```

详细信息请查阅 [Chart.js](http://www.chartjs.org/docs/#chart-configuration-chart-data) 的文档。

## 属性

基本图表中定义了一些属性。因为你 `extend()` 了它们，他们使用 *初始值*，但是你可以覆盖它们：

| 属性 | 说明 |
|---|---|
| width | 图表宽度 |
| height | 图表高度 |
| chart-id | canvas的id |


## 实例

下面是一些实例。

### 图表和属性

你可以创建数据和选项传递给图表。

```javascript
// LineChart.js
import { Line } from 'vue-chartjs'

export default {
  extends: Line,
  props: ['data', 'options'],
  mounted () {
    this.renderChart(this.data, this.options)
  }
}
```

然后你可以把它作为组件使用。

```html
 <line-chart :data="{your data object}" :options="{your options}"></line-chart>
```

如果你想要覆盖宽度和高度：

```html
 <line-chart
  :data="{your data object}"
  :options="{responsive: false, maintainAspectRatio: false}"
  :width="400"
  :height="200"
  >
 </line-chart>
```

<p class="warning">
  请注意，你必须设置 `responsive: false` 才可以使用 `width` 和 `height`。
</p>

### 使用本地数据创建图表

```javascript
import {Bar} from 'vue-chartjs'

export default {
  extends: Bar,
  data () {
    return {
      datacollection: {
        labels: ['January', 'February'],
        datasets: [
          {
            label: 'Data One',
            backgroundColor: '#f87979',
            data: [40, 20]
          }
        ]
      }
    }
  },
  mounted () {
    this.renderChart(this.datacollection, {responsive: true, maintainAspectRatio: false})
  }
}
```

### 可复用的组件

如果你希望你的组件可以复用，那么你最好封装它们。这样图表组件只是负责显示你封装的数据。单页应用和集成到 laravel 中有不同的使用方式。

## 动态数据

Chart.js 并不提供实时更新，然而 `vue-chartjs` 提供了两种方式。

- `reactiveProp`
- `reactiveData`

两种方式其实是一样的。多部分情况会使用 `reactiveProp`。它扩展了图表逻辑并且自动添加 `chartData` props 和 `vue watch`。当数据改变，它将会调用 `update()`。当添加了新的数据集，将会调用 `renderChart()`。

`reactiveData` 只是创建了本地变量并且添加到 watcher，而不是 prop，他只用在你创建单一图表并且在组件创建 api 的时候。

```javascript
data () {
  return {
    chartData: null
  }
}
```

### 实例

**LineChart.js**
```javascript
import { Line, mixins } from 'vue-chartjs'
const { reactiveProp } = mixins

export default {
  extends: Line,
  mixins: [reactiveProp],
  props: ['options'],
  mounted () {
    // this.chartData is created in the mixin
    this.renderChart(this.chartData, this.options)
  }
}
```

**RandomChart.vue**

```javascript
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

<p class="warning">
  ⚠ 注意：如果在父组件中修改数据并将数据传递给子图表组件时，请注意 JavaScript 的限制。
  更多信息请查阅 [issue#44](https://github.com/apertureless/vue-chartjs/issues/44)
</p>

### 限制
  <ul>
    <li>[Caveats](https://vuejs.org/v2/guide/list.html#Caveats)</li>
    <li>[Change-Detection-Caveats](https://vuejs.org/v2/guide/reactivity.html#Change-Detection-Caveats)</li>
    <li>[vm.$watch](https://vuejs.org/v2/api/#vm-watch)</li>
  </ul>

## Chart.js 对象

有时你需要更多的调整 chart.js。你可以访问 `this.$data._chart` 实例。

## 内联插件

在 Chart.js 你可以定义全局和内联插件。全局插件在 `vue-chartjs` 中没有问题，参照 [chart.js docs](http://www.chartjs.org/docs/latest/developers/plugins.html) 的说明。

如果你想添加内联插件 `vue-chartjs` 提供了一个方法 `addPlugin()`

你必须在 `renderChart()` 之前调用 `addPlugin()` 方法。

### 实例

```javascript
mounted () {
  this.addPlugin({
    id: 'my-plugin',
    beforeInit: function (chart) {
      ....
    }
  })
}
```

## 支持的图表

### 柱状图

<p class="tip">
  柱状图有两个版本。 `{Bar}` 和 `{HorizontalBar}`
</p>

![Bar](assets/bar.png)

### 折线图

![Line](assets/line.png)

### 环形图

![Doughnut](assets/doughnut.png)

### 饼图

![Pie](assets/pie.png)

### 雷达图

![Pie](assets/radar.png)

### 极坐标

![Pie](assets/polar.png)

### 热点图

![Bubble](assets/bubble.png)

### 散点图

这个图表有不同的数据结构。目前动态数据不适用于此图表类型。

![Scatter](assets/scatter.png)


## 不同构建工具的说明
有三种不同的切入点，取决于你用哪种构建工具。作为 dependencies 或者 peerDependency。

- Browser
- Browserify / Webpack 1
- Webpack 2


| Build | Chart.js | Vue.js |
|---|---|---|
| vue-chartjs.full.js | Bundled | Bundled |
| vue-chartjs.full.min.js |  Bundled | Bundled  |
| vue-chartjs.js | peerDependency | peerDependency  |
| vue-chartjs.min.js | peerDependency  | peerDependency  |
| es/index* |  peerDependency | peerDependency  |

### 浏览器
你可以在浏览中直接使用 `vue-chartjs`。像是 [codepen](https://codepen.io/apertureless/pen/vxWbqB?editors=1010) 这种情况，请使用 `vue-chartjs.full.min.js` 捆绑版本。他将 Vue.js 和 Chart.js 绑定在了一起，你只需要一个文件。


### Browserify / Webpack 1

如果你使用 Gulp, Browserify 或者 Webpack 1，`vue-chartjs.js` 被捆绑到 UMD 模块。

然而 Vue.js 和 Chart.js 是 `peerDependencies` 所以你需要独立安装它们。 大部分情况下你已经安装了 `Vue.js`，你可以使用不同版本的 Vue.js 和 Chart.js。

### Webpack 2
如果你使用 Webpack 2 它将自动使用 `jsnext:main` / `module` 入口。
像捆绑版本一样，`Vue.js` 和 `Chart.js` 都是 `peerDependencies`，需要安装。

## 资源

你可以在这里找到一些如何使用 `vue-chartjs` 的资源。

- [Using vue-chartjs with WordPress](https://medium.com/@apertureless/wordpress-vue-and-chart-js-6b61493e289f)
- [Create stunning Charts with Vue and Chart.js](https://hackernoon.com/creating-stunning-charts-with-vue-js-and-chart-js-28af584adc0a)
- [Let’s Build a Web App with Vue, Chart.js and an API Part I](https://hackernoon.com/lets-build-a-web-app-with-vue-chart-js-and-an-api-544eb81c4b44)
- [Let’s Build a Web App with Vue, Chart.js and an API Part II](https://hackernoon.com/lets-build-a-web-app-with-vue-chart-js-and-an-api-part-ii-39781b1d5acf)
- [Build a realtime chart with VueJS and Pusher](https://blog.pusher.com/build-realtime-chart-with-vuejs-pusher/)
