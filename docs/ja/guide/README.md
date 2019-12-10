# 最初に

**vue-chartjs** は [Chart.js](https://github.com/chartjs/Chart.js) をvueで使用するためのラッパーです。 再利用可能なチャートコンポーネントを簡単に作成できます。

## 初めに

`vue-chartjs` あまり手間をかけずにvueの中でchart.jsを使うことができます。 シンプルなチャートをできるだけ早く起動して実行したいという人に最適です。

chart.jsの基本ロジックを抽象化していますが、公開されたchart.jsのオブジェクトを使用して柔軟にカスタマイズできます。

## インストール

### NPM

`npm`を使って` vue-chartjs`をインストールすることができます。 ただしプロジェクトへの依存関係として `chart.js`を追加する必要があります。 なぜなら `Chart.js`はpeerDependencyだからです。 このため、Chart.jsのバージョンを完全に制御できます。

`yarn add vue-chartjs chart.js` or `npm install vue-chartjs chart.js --save`

::: tip
Vue.jsの Version 1.xを使用している場合は`legacy`タグを使用してください。しかし、vueのバージョン1はもうメンテナンスされません。

`yarn add vue-chartjs@legacy`
:::

### ブラウザ

ブラウザから直接 `vue-chartjs` を使用することができます。
先に`Chart.js`スクリプトを追加してから`vue-chartjs`スクリプトを追加してください

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.7.1/Chart.min.js"></script>
<script src="https://unpkg.com/vue-chartjs/dist/vue-chartjs.min.js"></script>
```

## 統合

`Chart.js`で利用可能なすべてのチャートタイプは名前付きコンポーネントとしてエクスポートされ、そのままインポートすることができます。 これらのコンポーネントは通常のVueコンポーネントですが、それを`拡張`する必要があります。

`vue-chartjs`の背後にある考え方は、最大限の柔軟性と拡張性を持ち、使いやすいコンポーネントを提供することです。 これを実現するには、独自の *Chart Component* を作成し、それを`vue-chartjs`コンポーネントして提供するように拡張する必要があります。

拡張することで、チャートコンポーネントのメソッドとロジックは、独自のチャートコンポーネントにマージされます。

## 最初のチャートの作成

BaseChartをインポートしてextendします。この方法で異なるデータのチャートを表示するときに柔軟性が大幅に向上します。
コンポーネントをカプセル化し、プロパティを使用してコンポーネント内のデータに渡したり、コンポーネント内に直接データを記述することができます。ただし直接コンポーネント内にデータを記述した場合は再利用ができません。

パッケージ全体または各モジュールを個別にインポートできます。 インポートしたものを `extends：`か `mixins：[]`を使って指定します。 また `mounted()`フックで、 `this.renderChart()`を呼び出します。 これでチャートインスタンスが作成されます。

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
`extends: Bar` または `mixins: [Bar]` どちらの記述方法でも使用できます。
:::

メソッドthis.renderChart（）は、Barコンポーネントによって提供され、2つのパラメータを受け付けています。 どちらも`Object`です。 最初のものは表示するデータで、二番目のものはオプションを格納するオブジェクトです。

チャート毎に必要なオブジェクト構造は公式 [Chart.js docs](http://www.chartjs.org/docs/latest/#creating-a-chart)をチェックしてください。

### Vue シングルファイルコンポーネント

本ドキュメントのほとんどの例はjavascriptファイルを基に記述されていて、 `.vue`ファイルの例はありません。 これはあなたが、たいてい必要なのは `<script>`ブロックだけだからです。 もちろん `.vue`ファイルを使うこともできます。

**Chart.vue**

```js
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

::: danger Template タグはマージできません
`.vue`ファイルに`<template>`タグを含めないでください。 Vueはテンプレートを**マージすることはできません**。`.vue`ファイルに空の `<template>`タグを追加すると、Vueは拡張されたものからではなく`.vue`のコンポーネントからテンプレートを取得します。その結果、空のテンプレートとエラーが発生します。
:::

## チャートデータの更新

Chart.js 自身ではデータセットを変更した場合に、ライブアップデートの機能を提供していません。 しかし`vue-chartjs`はこれを実現するために2つの mixin を提供します。

- `reactiveProp`
- `reactiveData`

両方のミックスインは実際には同じ結果を達成します。 ほとんどの場合は、`reactiveProp`を使います。 このミックスインはチャートコンポーネントのロジックを拡張し、自動的に `chartData`という名前のプロパティを作成し、このプロパティに`vue watch`を追加します。 データが変更されると、データセット内のデータだけが変更されていれば `update()`を、新しいデータセットが追加されていれば `renderChart()`を呼び出します。

`ractiveData`はプロパティではないローカルのchartData変数を作成し、Watcherを追加します。 これは単一目的のチャートが必要でチャートコンポーネント内でAPI呼び出しを行う場合にのみ役に立ちます。

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

::: danger 制限事項
[注意事項](https://jp.vuejs.org/v2/guide/list.html#注意事項)
[変更検出の注意事項](https://jp.vuejs.org/v2/guide/reactivity.html#変更検出の注意事項)
[vm.$watch](https://jp.vuejs.org/v2/api/#vm-watch)
:::

### イベント
データが変更されると、リアクティブミックスインはイベントを発行します。 チャートコンポーネントの `v：on`でそれらを受け取ることができます。 以下のイベントがあります。

- `chart:render` - ミックスインが完全にレンダリングしたとき
- `chart:destroy` - ミックスインがチャートオブジェクトインスタンスを削除したとき
- `chart:update` - ミックスインが再レンダリングの代わりに更新をしたとき
- `labels:update` - labelsがセットされたとき
- `xlabels:update` - xLabelsがセットされたとき
- `ylabels:update` - yLabelsがセットされたとき


### トラブルシューティング

現状でのリアクティブシステムは**頑強**ではありません。 データを渡すためのユースケースや方法が多数あるため、それにはいくつかの問題が発生することがあります。

#### オプション

`options`オブジェクトは今のところリアクティブではありません。 そのため、チャートのオプションを動的に変更しても、それらはミックスインによって認識されません。

ミックスインを使用している場合は、`options`というプロパティとしてオプションを渡す必要があります。 mixinがchart.jsの`update()`メソッドを呼び出すか、新しいチャートを破棄して描画する際に、これは重要です。 ミックスインが新しいチャートを描画するとき、`this.renderChart(this.chartData、this.options)`を呼び出します。

しかし、オプションを `mounted()`フックで直接渡すと、それらは失われます。

::: danger 間違った方法
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

::: tip 正しい方法
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

#### 独自のウォッチャー

（新しいデータをプッシュするのではなく）データをたくさん変更するのであれば、独自のウォッチャーを実装するのが一番良いやり方です。
必要に応じて、自分で `this.$data._chart.update()`または `this.renderChart()`を呼び出すことができます。

シンプルなwatcherの実装例:

```js
watch: {
  chartData () {
    this.$data._chart.update()
  }
}
```

## 例

### propsを使用したチャート

目標は再利用可能なチャートコンポーネントを作成することです。 この目的のためには、オプションとチャートデータをVue.jsの props として渡す必要があります。 このようにすることで、チャート自体はデータの取得については気にせず、表示のみに注力できます。

まずコンポーネントを作成します。

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

After that you can add your chart component to a parent component
その後、作成したチャートコンポーネントを親コンポーネントに追加できます。

```js
 <line-chart :chartdata="chartData" :options="chartOptions"/>
 ```

### ローカルデータを使用したチャート

You can handle your chart data directly in your own chart component. You only need to pass it to the `renderChart()` method.
独自ののチャートコンポーネントでチャートデータを直接扱うことができます。 コンポーネント内のチャートデータを `renderChart()`メソッドに渡すだけです。

```js
import { Bar } from 'vue-chartjs'

export default {
  extends: Bar,
  data: () => ({
    chartdata: {
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
    },
    options: {
      responsive: true,
      maintainAspectRatio: false
    }
  }),

  mounted () {
    this.renderChart(this.datacollection, this.options)
  }
}
```

### APIから取得したデータを用いたチャート


一般的にはデータを取得するためにAPIを使用するのがパターンでしょう。しかし留意すべきことがいくつかあります。
最も一般的な問題は、チャートコンポーネントを直接マウントし、非同期API呼び出しからデータを渡すことです。
このアプローチでの問題点は、chart.jsがチャートをレンダリングしてチャートデータにアクセスしようとしますが、API呼び出しが非同期だということです。 この時、データが到着する前にあなたはチャートを表示しようとしてしまいます。

これを防ぐには、単純な `v-if`が最善の解決策です。

データプロパティとオプションプロパティを使用してチャートコンポーネントを作成すると、コンテナコンポーネントからデータとオプションを渡すことができます。

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

それから、あなたのAPIコールまたはVuex接続を処理するコンテナコンポーネントを作成します。

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
import LineChart from './LineChart.vue'

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
        this.chartData = userlist
        this.loaded = true
      } catch (e) {
        console.error(e)
      }
  }
}
</script>
```

### 動的スタイルを使用したチャート

あなたは `responsive：true`をセットして外側のdivにインラインスタイルとして適用されるstylesオブジェクトを渡すことができます。 これにより、外側のコンテナの高さと幅を動的に変更できます。 これはchart.jsのデフォルトの動作ではありません。 これには計算プロパティを使用するのが最善です。

::: warning
 `position: relative`をセットする必要があります。
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

### Custom / New Charts

場合によっては、デフォルトのChart.jsに用意されているチャートを拡張する必要があります。
デフォルトチャートを拡張および変更する方法、あるいは独自のチャートタイプを作成する方法は、たくさんの[例](http://www.chartjs.org/docs/latest/developers/charts.html)があります。

`vue-chartjs`でも、これとほぼ同じ方法で行うことができます。

```js
// 1. Import Chart.js so you can use the global Chart object
import Chart from 'chart.js'
// 2. Import the `generateChart()` method to create the vue component.
import { generateChart } from 'vue-chartjs'

// 3. Extend on of the default charts
// http://www.chartjs.org/docs/latest/developers/charts.html
Chart.defaults.LineWithLine = Chart.defaults.line;
Chart.controllers.LineWithLine = Chart.controllers.line.extend({ /* custom magic here */})

// 4. Generate the vue-chartjs component
// First argument is the chart-id, second the chart type.
const CustomLine = generateChart('custom-line', 'LineWithLine')

// 5. Extend the CustomLine Component just like you do with the default vue-chartjs charts.

export default {
  extends: CustomLine,
  mounted () {
    // ....
  }
}
```

## リソース

`vue-chartjs`の使い方に関するチュートリアルのようないくつかのリソースがあります。

- [Using vue-chartjs with WordPress](https://medium.com/@apertureless/wordpress-vue-and-chart-js-6b61493e289f)
- [Create stunning Charts with Vue and Chart.js](https://hackernoon.com/creating-stunning-charts-with-vue-js-and-chart-js-28af584adc0a)
- [Let’s Build a Web App with Vue, Chart.js and an API Part I](https://hackernoon.com/lets-build-a-web-app-with-vue-chart-js-and-an-api-544eb81c4b44)
- [Let’s Build a Web App with Vue, Chart.js and an API Part II](https://hackernoon.com/lets-build-a-web-app-with-vue-chart-js-and-an-api-part-ii-39781b1d5acf)
- [Build a realtime chart with VueJS and Pusher](https://blog.pusher.com/build-realtime-chart-with-vuejs-pusher/)
