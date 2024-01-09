# 코딩 레퍼런스

## Props

`vue-chartjs`가 제공하는 컴포넌트들은 몇 가지 기본적인 속성들을 정의한다. `확장`하고 있기 때문에, 그들은 * 보이지 않는 *이지만, 그 값을 덮어 쓸 수 있습니다 :

| Prop 이름 | 설명 |
|---|---|
| width | 차트 폭 |
| height | 차트 높이 |
| chart-id | canvas 요소의 id |
| css-classes | 둘러싸는 div css 클래스 (문자열) |
| styles | 둘러싸는 div 의 css 클래스 (객체) |
| plugins | chartjs 플러그인 (배열) |

## Events

`reactData` 또는 `reactProp` 믹스 인이 사용되면 다음 이벤트가 발행됩니다.

| 이벤트 이름 | 설명 |
|---|---|
| `chart:render` | 믹스 인이 완전히 렌더링 될 때 |
| `chart:destroy` | 믹스인이 차트 오브젝트 인스턴스를 삭제할 때 |
| `chart:update` | 믹스 인이 다시 렌더링 대신 업데이트를 할 때 |
| `labels:update` | labels가 설정되면 |
| `xlabels:update` | xlabels가 설정되면 |
| `ylabels:update` | ylabels가 설정되면 |

## Global Methods
전역 메소드는 가져오고 사용합니다.

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

인스턴스 메소드는 독자적인 차트 컴퍼넌트내에서 사용할 수가 있습니다.


### generateLegend()

HTML 범례를 만드는 도우미 함수

- **Type:** `Function`
- **Arguments**: `none`
- **Usage:**

```js{11}
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

### 플러그인 추가

Chart.js에서는 글로벌 플러그인과 인라인 플러그인을 정의할 수 있습니다. 글로벌 플러그인은 [Chart.js docs] (http://www.chartjs.org/docs/latest/developers/plugins.html)에서 설명한대로 'vue-chartjs'에서도 잘 작동합니다. .


인라인 플러그인을 추가하려는 경우를 대비하여 `vue-chartjs`는 `addPlugin()`이라는 헬퍼 메소드를 노출합니다.

`renderChart()` 메소드 앞에 `addPlugin()` 을 호출해야합니다.

- **Type:** `Function`
- **Arguments**: `Array` of Plugins
- **Usage:**### 플러그인 추가

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

Chart.js의 인스턴스를 만들고 그립니다.

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

## Chart.js 객체

독자적인 차트 컴퍼넌트내로부터 Chart.js 의 오브젝트에는 `this.$data._chart` 로 액세스 할 수 있습니다.

## Canvas

Canvas 요소는 `this.$refs.canvas`로 액세스 할 수 있습니다.