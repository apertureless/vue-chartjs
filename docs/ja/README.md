---
search: ja
---

# vue-chartjs
**vue-chartjs** は [Chart.js](https://github.com/chartjs/Chart.js) をvueで使用するためのラッパーです。 再利用可能なチャートコンポーネントを簡単に作成できます。

## イントロ
`vue-chartjs` vueの中であまり面倒なくchart.jsを使うことができます。 シンプルなチャートをできるだけ早く実行したいという人に最適です。

chart.jsの基本ロジックを抽象化していますが、公開されたchart.jsのオブジェクト使用して柔軟にカスタマイズできます。

## インストール
Vue.jsの Version2以上を使用している場合は簡単にインストールできます。:

`yarn add vue-chartjs chart.js`

Vue.jsの Version 1.xを使用している場合は`legacy`タグを使用してください。しかし、vueのバージョン1はもうメンテナンスされません。

`yarn add vue-chartjs@legacy`

## クイックスタート

BaseChartをインポートしてextendします。

異なるデータのチャートを表示するときに柔軟性が大幅に向上します。
コンポーネントをカプセル化し、プロパティをコンポーネントのデータに渡したり、コンポーネント内に直接データを記述することができます。ただし直接データを記述した場合はコンポーネントの再利用ができません。

パッケージ全体またはモジュールごとに個別にインポートすることができます。

```javascript
// CommitChart.js
import { Bar } from 'vue-chartjs'

export default Bar.extend({
  mounted () {
    // Overwriting base render method with actual data.
    this.renderChart(data, options)
  }
})
```

renderChart()メソッドに2つの引数を渡すことができます:

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

BaseChartsには基本プロパティがいくつか定義されています。 extendされたときにそれらは明示的に表示されていませんが、使用するときに上書きして設定することができます。

| プロパティ | 説明 |
|---|---|
| width | chartの表示幅 |
| height | chartの表示高さ |
| chart-id | canvas要素のid |


## 実装例

いくつか例を記載します。

### プロパティの利用

dataとoptionsプロパティを作成して、チャートにデータを渡すことが出来ます。

```javascript
// LineChart.js
import { Line } from 'vue-chartjs'

export default Line.extend({
  props: ['data', 'options'],
  mounted () {
    this.renderChart(this.data, this.options)
  }
})
```

コンポーネントに追加して、使用することができます。

```html
 <line-chart :data="{your data object}" :options="{your options}"></line-chart>
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
`width` と `height` を反映させるためには、 `responsive：false` を設定しなければならないことに注意してください。
</p>

### コンポーネント内のローカルデータを使用する場合

```javascript
import {Bar} from 'vue-chartjs'

export default Bar.extend({
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
})
```

### コンポーネントの再利用

チャートコンポーネントを再利用可能にしたい場合は、ラッパーを使用することをお勧めします。このようにすると、チャートコンポーネントはデータ表示とロジックを含むラッパーコンポーネントに対してのみ応答可能です。単一ページアプリケーションを実行している場合や、laravelで統合されている場合は、異なった方法があります。


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

export default Line.extend({
  mixins: [reactiveProp],
  props: ['options'],
  mounted () {
    // this.chartData is created in the mixin
    this.renderChart(this.chartData, this.options)
  }
})
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

場合によっては、chart.jsをより詳細に制御する必要があります。Chart.jsインスタンスには `this._chart` を使ってアクセスします。

## 利用可能なグラフ

### 棒グラフ
<p class="tip">
  棒グラフには `{Bar}` と `{HorizontalBar}` の2つのバージョンがあります。
</p>

![Bar](assets/bar.png)
### 折れ線グラフ

![Line](assets/line.png)

### ドーナツチャート

![Doughnut](assets/doughnut.png)

### パイチャート

![Pie](assets/pie.png)

### レーダーチャート

![Pie](assets/radar.png)

### 鶏頭図

![Pie](assets/polar.png)

### バブルチャート

![Bubble](assets/bubble.png)


## ビルド方法の違い
あなたが使用するビルドツールに依存した３つの異なるエントリーポイントがあります。 依存するライブラリは一緒にバンドルされているか、または peerDependency として指定します。

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

### ブラウザー
`vue-chartjs` をビルドツールを使用せず直接ブラウザー内で使用します。 例 [codepen](https://codepen.io/apertureless/pen/vxWbqB?editors=1010) このケースでは縮小版の `vue-chartjs.full.min.js` を使用します。これにはVue.js と Chart.js が 含まれていて、UMD Module として定義されています。従ってあなたはただ一つのファイルしか必要としません。

### Browserify / Webpack 1
Gulp、BrowserifyまたはWebpackのバージョン1を使用している場合は、__トランスパイル__ され UMD Moduleとして __バンドル__ された `vue-chartjs.js` を使用します。

Vue.jsとChart.jsは `peerDependencies` なので別にインストールする必要があります。ほとんどのプロジェクトでは、Vue.jsはすでにインストールされているでしょう。この方法では、このパッケージと異なるバージョンのVue.jsとChart.jsを持つことができます。

### Webpack 2
Webpack 2を使用している場合、 `jsnext:main` または `module` に`es/index.js` を指定します。 ソースファイルは __トランスパイル__ されます。またmoduleには __バンドル__ されません。このようにすると `tree shaking` が動作します。バンドル版のように、`peerDependencies` で指定された `Vue.js` と `Chart.js` はインストールする必要があります。
