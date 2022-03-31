# コーディング レファレンス

## Props

`vue-chartjs`によって提供されるコンポーネントにはいくつかの基本的なプロパティが定義されています。 `拡張`しているので、それらは *見えない* ですが、それらの値は上書きすることができます：

| Prop名 | 説明 |
|---|---|
| width | チャート幅 |
| height | チャート高さ |
| chart-id | canvas要素のid |
| css-classes | 囲んでいる div の css クラス (文字列) |
| styles | 囲んでいる div の css クラス (オブジェクト) |
| plugins | chartjs プラグイン (配列) |

## Events

`reactData`または` reactProp`ミックスインが使用されている場合、以下のイベントが発行されます。

| Event名 | 説明|
|---|---|
| `chart:render` | ミックスインが完全にレンダリングしたとき |
| `chart:destroy` | ミックスインがチャートオブジェクトインスタンスを削除したとき |
| `chart:update` | ミックスインが再レンダリングの代わりに更新をしたとき |
| `labels:update` | labelsがセットされたとき |
| `xlabels:update` | xlabelsがセットされたとき |
| `ylabels:update` | ylabelsがセットされたとき |

## Global Methods
グローバルメソッドはインポートして使用します。

### generateChart

- **Type:** `Function`
- **Arguments**: `chart-id`, `chart-type`
- **Usage:**

```js
import { generateChart } from 'vue-chartjs'
// First argument is the chart-id, second the chart type.
const CustomLine = generateChart('custom-line', 'LineWithLine')
```

## Instance Methods

インスタンスメソッドは独自のチャートコンポーネント内で使用することができます。


### generateLegend()

HTMLの凡例を作成するヘルパー関数

- **Type:** `Function`
- **Arguments**: `none`
- **Usage:**

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

### プラグインの追加

Chart.jsでは、グローバルプラグインとインラインプラグインを定義できます。 グローバルプラグインは、[Chart.js docs](http://www.chartjs.org/docs/latest/developers/plugins.html)で説明されているように`vue-chartjs`でも問題なく動作します。 


インラインプラグインを追加したい場合に備えて、`vue-chartjs`は`addPlugin()`と呼ばれるヘルパーメソッドを公開します。

`renderChart()`メソッドの前に `addPlugin()`を呼び出すべきです。

- **Type:** `Function`
- **Arguments**: `Array` of Plugins
- **Usage:**

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

Chart.js のインスタンスを作成して描画します。

- **Type:** `Function`
- **Arguments**: `Chart Data`, `Chart Options`
- **Usage:**

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

## Chart.js オブジェクト

独自のチャートコンポーネント内からChart.jsのオブジェクトには `this.$data._chart` でアクセスできます。

## Canvas

Canvas要素には `this.$refs.canvas` でアクセスできます。
