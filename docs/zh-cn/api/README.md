# 编码参考

## Props

这里有一些`vue-chartjs`提供的基本参数定义. 因为你是 `extend` 他们的, 所以他们是*不可见的*, 但是你可以覆盖他们:

| 参数名 | 描述 |
|---|---|
| width | 图表宽度 |
| height | 图表高度 |
| chart-id | canvas的id |
| css-classes |  css类的字符串 |
| styles |  css 样式对象 |
| plugins | chartjs 插件数组 |

## 事件

如果 `reactiveData` 或者 `reactiveProp` mixin 被附加, 下面事件将会被调用:

| 事件 | 描述|
|---|---|
| `chart:render` | 如果 mixin 执行完全重绘 |
| `chart:destroy` | 如果 mixin 删除图表对象实例 |
| `chart:update` | 如果 mixin 执行更新而不是重绘 |
| `labels:update` | 如果设置了新的labels |
| `xlabels:update` | 如果设置了新的xLabels |
| `ylabels:update` | 如果设置了新的yLabels |


## 全局方法
全局方法需要被引入才能使用.

### generateChart

- **类型:** `Function`
- **参数**: `chart-id`, `chart-type`
- **使用:**

```js
import { generateChart } from 'vue-chartjs'
// 第一个参数是 图表id, 第二个参数是 图表类型.
const CustomLine = generateChart('custom-line', 'LineWithLine')
```

## 实例方法

实例方法可以在你图表组件内部使用.

### generateLegend()

用来生成HTML说明的工具函数.

- **类型:** `Function`
- **参数**: `none`
- **使用:**

```js {11}
import { Line } from 'vue-chartjs'

export default {
  extends: Line,
  props: ['datasets', 'options']
  data: () => ({
    htmlLegend: null
  })
  mounted () {
    this.renderChart(this.datasets, this.options)
    this.htmlLegend = this.generateLegend()
  }
}

```

### addPlugin

在 Chart.js 你可以定义全局和内联插件. 全局插件在没有 `vue-chartjs`也可以工作. 就像这个文档[Chart.js docs](http://www.chartjs.org/docs/latest/developers/plugins.html) 描述的.

如果你需要添加内联插件, `vue-chartjs` 暴露出来了一个工具方法 `addPlugin()`
你可以在`renderChart()`方法前调用`addPlugin()`.

- **类型:** `Function`
- **参数**: `Array` 插件数组
- **使用:**

```js
mounted () {
  this.addPlugin({
    id: 'my-plugin',
    beforeInit: function (chart) {
      ....
    }
  })
}
```

### renderChart()

创建一个 Chart.js 实例, 并渲染图表

- **类型:** `Function`
- **参数**: `Chart Data`, `Chart Options`
- **使用:**

```js
mounted () {
  this.renderChart({
    labels: ['January', 'February'],
    datasets: [
      {
        label: 'Data One',
        backgroundColor: '#f87979',
        data: [40, 20]
      }
    ]},
    {
      responsive: true
    }
  )
}
```

## Chart.js 对象

你可以在你的图表组件里, 通过 `this.$data._chart` 访问 Chart.js 对象

## Canvas

你可以通过 `this.$refs.canvas` 访问 canvas
