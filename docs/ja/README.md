---
search: ja
---

# vue-chartjs
**vue-chartjs** は [Chart.js](https://github.com/chartjs/Chart.js) をvueで使用するためのラッパーです。 再利用可能なチャートコンポーネントを簡単に作成できます。

## イントロ
`vue-chartjs` vueの中であまり面倒なことがなくchart.jsを使うことができます。 シンプルなチャートをできるだけ早く実行したいという人に最適です。

chart.jsの基本ロジックを抽象化していますが、公開されたchart.jsのオブジェクト使用して柔軟にカスタマイズできます。

## インストール
Vue.jsの Version2以上を使用している場合は簡単にインストールできます。:

`yarn add vue-chartjs chart.js`

Vue.jsの Version 1.xを使用している場合は`legacy`タグを使用してください。しかし、vueのバージョン1はもうメンテナンスされません。

`yarn add vue-chartjs@legacy`

## クイックスタート

BaseChartをインポートしてextendします。異なるデータのチャートを表示するときに柔軟性が大幅に向上します。
コンポーネントをカプセル化し、プロパティをコンポーネントのデータに渡したり、コンポーネント内に直接データを記述することができます。ただし直接データを記述した場合はコンポーネントの再利用ができません。

パッケージ全体またはモジュールごとに個別にインポートすることができます。

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

`renderChart()`メソッドに2つの引数を渡すことができます:

- Data object
- Options object

### データオブジェクト

データオブジェクトは、次のようになります。:

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

詳細については、[Chart.js](http://www.chartjs.org/docs/#chart-configuration-chart-data) のドキュメントをご覧ください。

## プロパティ

BaseChartsには基本プロパティがいくつか定義されています。 `extend()`したときにそれらは *表示されていません* が、使用するときに上書きして設定することができます。

| プロパティ | 説明 |
|---|---|
| width | chartの表示幅 |
| height | chartの表示高さ |
| chart-id | canvas要素のid |
| css-classes | 周囲のdivのCSSクラスの文字列 |
| styles | 周囲のdivコンテナのCSSスタイルを持つオブジェクト |

## 実装例

いくつか例を記載します。

### プロパティの利用

dataとoptionsプロパティを作成して、チャートにデータを渡すことが出来ます。

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

コンポーネントに追加して、使用することができます。

```html
<line-chart :data="chartData" :options="chartOptions"></line-chart>
```

幅と高さを上書きする場合:

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
`width` と `height` を固定値で表示させるためには、 `responsive：false` を設定しなければならないことに注意してください。
</p>

### ローカルデータを使用したチャート

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
  }
  mounted () {
    this.renderChart(this.datacollection, {responsive: true, maintainAspectRatio: false})
  }
}
```

### コンポーネントの再利用

チャートコンポーネントを再利用可能にしたい場合は、ラッパーを追加して使用することがベストです。このようにしてチャートコンポーネントは純粋なデータ表示を行い、ラッパーコンポーネントは背後のロジックを担当します。単一ページアプリケーションを実行している場合や、たとえば laravel などで統合されている場合は、異なった方法があります。

## リアクティブデータ

Chart.js はデータセットを変更したときのライブアップデートを提供していません。`vue-chartjs` ではこれを実現するために2つのミックスインを提供します。

- `reactiveProp`
- `reactiveData`

この２つのミックスインは実際には同じものです。 ほとんどの場合 `reactiveProp` を使用します。これはチャートコンポーネントのロジックを拡張し、自動的に `chartData` という名前のプロパティを追加し、さらにこのプロパティに対して `vue watch` を追加します。 データの更新に対して、データセット内のデータのみが変更されたときには `update()` を呼び出し、新しいデータセットが追加された場合は `renderChart()` が呼び出されます。

`reactiveData` は単純に(プロパティではない!!)ローカルの chartData 変数を追加し、ウォッチャーを追加します。
単一の目的のチャートのみ必要でチャートコンポーネント内でAPI呼び出しを行うときのみ有用です。

```javascript
data () {
  return {
    chartData: null
  }
}
```

### 例

**LineChart.js**
```javascript
import { Line, mixins } from 'vue-chartjs'
const { reactiveProp } = mixins

export default {
  extends: Line,
  mixins: [reactiveProp],
  props: ['options'],
  mounted () {
    // this.chartData is created in the mixin.
    // If you want to pass options please create a local options object
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
  ⚠ 注意:親コンポーネントでデータを変更し、それを子チャートコンポーネントに渡す場合は、JavaScriptの制限事項に注意してください。
  この問題の詳細 [issue#44](https://github.com/apertureless/vue-chartjs/issues/44)
</p>

### 制限事項
  <ul>
    <li>[注意事項](https://jp.vuejs.org/v2/guide/list.html#注意事項)</li>
    <li>[変更検出の注意事項](https://jp.vuejs.org/v2/guide/reactivity.html#変更検出の注意事項)</li>
    <li>[vm.$watch](https://jp.vuejs.org/v2/api/#vm-watch)</li>
  </ul>

## Chart.js オブジェクト

時にはchart.jsをより詳細に制御する必要があります。そのためには `this.$data._chart` を使ってChart.jsインスタンスにアクセスすることができます。

## インライン プラグイン

Chart.jsでは、グローバルプラグインとインラインプラグインを定義できます。[Chart.js docs]（http://www.chartjs.org/docs/latest/developers/plugins.html）で記載されているのようなグローバルプラグインは、 `vue-chartjs ` で問題なく動作しています。

インラインプラグインを追加したい場合のために `vue-chartjs`は` addPlugin（） `というヘルパーメソッドを提供します。
`renderChart（）`メソッドの前に `addPlugin（）`を呼び出す必要があります。

### Example

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
## チャートのカスタマイズ / 新たに定義するチャート

場合によっては、デフォルトの Chart.jsのチャートを拡張する必要があります。デフォルトのグラフを拡張して変更する方法の例がたくさんあります。または、必要であれば独自のチャートタイプを作成することもできます。

`vue-chartjs` においても、これと同じようにすることができます。

```js
// 1. Chart.jsをインポートして、グローバルChartオブジェクトを使用できるようにします。
import Chart from 'chart.js'
// 2. コンポーネントを作成するときに使用する `generateChart()` メソッドをインポートします。
import { generateChart } from 'vue-chartjs'

// 3. デフォルトチャートを拡張します
// http://www.chartjs.org/docs/latest/developers/charts.html
Chart.defaults.LineWithLine = Chart.defaults.line;
Chart.controllers.LineWithLine = Chart.controllers.line.extend({ /* custom magic here */})

// 4. vue-chartjs コンポーネントを作成します。
// 最初の引数はチャートのID, 2番目の引数はチャートタイプ
const CustomLine = generateChart('custom-line', 'LineWithLine')

// 5. 拡張された CustomLine コンポーネントはデフォルトのvue-chartjsチャートのように使用できます。

export default {
  extends: CustomLine,
  mounted () {
    // ....
  }
}
```

## 利用可能なグラフ

### 棒グラフ
<p class="tip">
  棒グラフには `{Bar}` と `{HorizontalBar}` の2つのバージョンがあります。
</p>

![Bar](../assets/bar.png)
### 折れ線グラフ

![Line](../assets/line.png)

### ドーナツチャート

![Doughnut](../assets/doughnut.png)

### パイチャート

![Pie](../assets/pie.png)

### レーダーチャート

![Pie](../assets/radar.png)

### 鶏頭図

![Pie](../assets/polar.png)

### バブルチャート

![Bubble](../assets/bubble.png)

### 散布図

このチャートは、他のものとは異なるデータ構造を持っています。現在のところ、reactive mixins はこのチャートタイプでは機能していません。

![Scatter](../assets/scatter.png)



## Resources

以下に `vue-chartjs` の使い方に関するチュートリアルのようなリソースがあります


- [Using vue-chartjs with WordPress](https://medium.com/@apertureless/wordpress-vue-and-chart-js-6b61493e289f)
- [Create stunning Charts with Vue and Chart.js](https://hackernoon.com/creating-stunning-charts-with-vue-js-and-chart-js-28af584adc0a)
- [Let’s Build a Web App with Vue, Chart.js and an API Part I](https://hackernoon.com/lets-build-a-web-app-with-vue-chart-js-and-an-api-544eb81c4b44)
- [Let’s Build a Web App with Vue, Chart.js and an API Part II](https://hackernoon.com/lets-build-a-web-app-with-vue-chart-js-and-an-api-part-ii-39781b1d5acf)
- [Build a realtime chart with VueJS and Pusher](https://blog.pusher.com/build-realtime-chart-with-vuejs-pusher/)
