# 시작하기

**vue-chartjs**는 [Chart.js](https://github.com/chartjs/Chart.js)를 vue에서 사용하기 위한 래퍼입니다. 재사용 가능한 차트 구성 요소를 쉽게 만들 수 있습니다.

## 처음에

`vue-chartjs` 너무 힘들지 않고 vue 안에서 chart.js를 사용할 수 있습니다. 간단한 차트를 가능한 한 빨리 시작하고 실행하고 싶은 사람에게 이상적입니다.

chart.js의 기본 로직을 추상화하고 있지만 게시 된 chart.js의 객체를 사용하여 유연하게 사용자 정의 할 수 있습니다.

## 설치

### NPM

`npm`을 사용하여 `vue-chartjs`를 설치할 수 있습니다. 그러나 프로젝트에 대한 종속성으로 `chart.js`를 추가해야합니다. 왜냐하면 `Chart.js`는 peerDependency이기 때문입니다. 따라서 Chart.js 버전을 완전히 제어할 수 있습니다.

`yarn add vue-chartjs chart.js@2.9.4` or `npm install vue-chartjs chart.js@2.9.4 --save`

::: tip
Vue.js의 버전 1.x를 사용하는 경우 `legacy` 태그를 사용하십시오. 그러나 vue의 버전 1은 더 이상 유지 보수되지 않습니다.

`yarn add vue-chartjs@legacy`
:::

### 브라우저

브라우저에서 직접 `vue-chartjs`를 사용할 수 있습니다.
먼저 `Chart.js` 스크립트를 추가하고`vue-chartjs` 스크립트를 추가하십시오.

``html
<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.7.1/Chart.min.js"></script>
<script src="https://unpkg.com/vue-chartjs/dist/vue-chartjs.min.js"></script>
``

## 통합

`Chart.js`에서 사용 가능한 모든 차트 유형은 명명된 컴포넌트로 내보내져 그대로 가져올 수 있습니다. 이러한 컴포넌트는 일반적인 Vue 컴포넌트이지만 그것을 `확장`해야합니다.

`vue-chartjs` 뒤에 있는 아이디어는 최대한의 유연성과 확장성을 가지며 사용하기 쉬운 컴포넌트를 제공하는 것이다. 이것을 실현하려면 , 독자적인 *Chart Component* 를 작성해, 그것을 `vue-chartjs` 컴퍼넌트해 제공하도록 확장할 필요가 있습니다.

확장하면 차트 구성 요소의 메서드와 논리가 자체 차트 구성 요소에 병합됩니다.

## 첫 번째 차트 만들기

BaseChart를 가져오고 확장합니다. 이 방법으로 다른 데이터의 차트를 볼 때 유연성이 크게 향상됩니다.
구성 요소를 캡슐화하고 속성을 사용하여 구성 요소의 데이터에 전달하거나 구성 요소에 직접 데이터를 설명할 수 있습니다. 다만 직접 컴퍼넌트내에 데이터를 기술했을 경우는 재이용을 할 수 없습니다.

전체 패키지 또는 각 모듈을 개별적으로 가져올 수 있습니다. 가져온 것을 `extends:` 또는 `mixins:[]`를 사용하여 지정합니다. 또한 `mounted()` 후크에서 `this.renderChart()`를 호출합니다. 이제 차트 인스턴스가 생성됩니다.


``js {1,4,6}
import { Bar } from 'vue-chartjs'

export default {
  extends: Bar,
  mounted () {
    this.renderChart(data, options)
  }
}
``

:::tip
`extends: Bar` 또는 `mixins: [Bar]` 어느 쪽의 기술 방법으로도 사용할 수 있습니다.
:::

this.renderChart() 메서드는 Bar 구성 요소에서 제공하며 두 개의 매개 변수를 허용합니다. 둘 다 `Object`입니다. 첫 번째는 표시할 데이터이고 두 번째는 옵션을 저장하는 개체입니다.

각 차트에 필요한 객체 구조는 공식 [Chart.js docs] (http://www.chartjs.org/docs/latest/#creating-a-chart)을 확인하십시오.

### Vue 단일 파일 구성 요소

이 문서의 대부분의 예는 javascript 파일을 기반으로 작성되었으며 `.vue` 파일의 예는 없습니다. 이것은 당신이 '<script>` 블록만 필요하기 때문입니다. 물론 `.vue` 파일을 사용할 수도 있습니다.

**Chart.vue**

``js
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
``

::: danger Template 태그는 병합할 수 없습니다.
`.vue` 파일에 `<template>` 태그를 포함하지 마십시오. Vue는 템플릿을 **병합할 수 없습니다**. `.vue` 파일에 빈 `<template>` 태그를 추가하면 Vue는 확장된 것이 아니라 `.vue` 컴포넌트에서 템플릿을 가져옵니다. 그 결과 빈 템플릿과 오류가 발생합니다.
:::

## 차트 데이터 업데이트

v4부터 차트는 기본적으로 데이터 변경 `watch`와 옵션 변경 `watch`가 있으므로 새 데이터 또는 새 옵션이 전달되면 (변경되면) Vue Chart 래퍼가 차트를 업데이트하거나 다시 렌더링합니다. v4부터는 믹스인이 제거되었습니다.

### 예제

```vue
<template>
  <Bar :data="chartData" :options="chartOptions" />
</template>

<script>
// DataPage.vue
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default {
  name: 'BarChart',
  components: { Bar },
  computed: {
      chartData() { return /* mutable chart data */ },
      chartOptions() { return /* mutable chart options */ }
    }
}
</script>
```

차트 데이터를 업데이트할 때 Vue의 `Target is read only` 경고가 나타날 수 있습니다.

데이터가 '읽기 전용' (`read only`) 반응 값인 경우 클론을 사용하여 이 경고를 재정의할 수 있습니다

```vue
<template>
  <Bar :data="JSON.stringify(JSON.parse(chartData))" :options="chartOptions" />
</template>
```

차트 데이터가 수정 가능한 계산된 속성 경우 [writable computed value](https://vuejs.org/guide/essentials/computed#writable-computed) 클론을 사용할 필요가 없습니다

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
    data() {
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

::: danger 제한 사항
[주의 사항] (https://kr.vuejs.org/v2/guide/list.html#주의 사항)
[변경 탐지주의 사항] (https://kr.vuejs.org/v2/guide/reactivity.html# 변경 탐지주의 사항)
[vm.$watch](https://kr.vuejs.org/v2/api/#vm-watch)
:::

### 이벤트
데이터가 변경되면 리액티브 믹스 인은 이벤트를 발행합니다. 차트 컴포넌트의 `v:on`에서 이를 받을 수 있습니다. 다음 이벤트가 있습니다.


- `chart : render` - 믹스 인이 완전히 렌더링 될 때
- `chart : destroy` - 믹스 인이 차트 객체 인스턴스를 삭제할 때
- `chart : update` - 믹스 인이 다시 렌더링 대신 업데이트를 할 때
- `labels : update` - labels가 설정되면
- `xlabels : update` - xLabels가 설정되면
- `ylabels : update` - yLabels가 설정되면


### 문제 해결

현재의 리액티브 시스템은 **강력**이 아닙니다. 데이터를 전달하는 유스 케이스와 방법이 많기 때문에 몇 가지 문제가 발생할 수 있습니다.

#### 옵션

`options` 객체는 현재 리액티브가 아니다. 따라서 차트 옵션을 동적으로 변경해도 믹스인이 인식하지 못합니다.

믹스 인을 사용하는 경우 옵션을 `options`라는 속성으로 전달해야합니다. mixin이 chart.js의 `update()` 메소드를 호출하거나 새로운 차트를 파기하고 그릴 때 이것은 중요합니다. 믹스 인이 새로운 차트를 그릴 때 `this.renderChart(this.chartData, this.options)`를 호출합니다.

그러나 옵션을 `mounted()` 훅으로 직접 전달하면 잃어버립니다.

::: danger 잘못된 방법
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

#### 자신의 감시자

(새로운 데이터를 푸시하는 대신) 데이터를 많이 변경한다면, 자신의 감시자를 구현하는 것이 가장 좋은 방법입니다.
필요에 따라서, 스스로 `this.$data._chart.update()` 또는 `this.renderChart()`를 호출할 수가 있습니다.

간단한 watcher 구현 예 :

```js
watch: {
  chartData () {
    this.$data._chart.update()
  }
}
```

## 예제

### props를 사용한 차트

목표는 재사용 가능한 차트 구성 요소를 만드는 것입니다. 이를 위해 옵션과 차트 데이터를 Vue.js의 props로 전달해야합니다. 이런 식으로 차트 자체는 데이터 검색에 대해 신경 쓰지 않고 표시에만 집중할 수 있습니다.

먼저 구성 요소를 만듭니다.

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
그런 다음 작성한 차트 구성 요소를 상위 구성 요소에 추가할 수 있습니다.

```js
 <line-chart :chartdata="chartData" :options="chartOptions"/>
 ```

### 로컬 데이터를 사용한 차트

고유한 차트 구성 요소로 차트 데이터를 직접 처리할 수 있습니다. 컴퍼넌트내의 차트 데이터를 `renderChart()` 메소드에 건네줄 뿐입니다.

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

### API에서 얻은 데이터를 사용한 차트


일반적으로 데이터를 검색하기 위해 API를 사용하는 것이 패턴입니다. 그러나 유의해야 할 몇 가지가 있습니다.
가장 일반적인 문제는 차트 구성 요소를 직접 마운트하고 비동기 API 호출에서 데이터를 전달하는 것입니다.
이 접근 방식의 문제점은 chart.js가 차트를 렌더링하고 차트 데이터에 액세스하려고 시도하지만 API 호출이 비동기라는 것입니다. 이 때 데이터가 도착하기 전에 차트를 표시하려고합니다.

이것을 막기 위해서는 간단한 `v-if`가 가장 좋은 해결책입니다.

데이터 속성과 옵션 속성을 사용하여 차트 구성 요소를 만들면 컨테이너 구성 요소에서 데이터와 옵션을 전달할 수 있습니다.

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

그런 다음 API 호출 또는 Vuex 연결을 처리하는 컨테이너 구성 요소를 만듭니다.

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

### 동적 스타일을 사용한 차트

당신은 `responsive:true`를 설정하고 외부 div에 인라인 스타일로 적용되는 styles 객체를 전달할 수 있습니다. 이렇게 하면 외부 컨테이너의 높이와 너비를 동적으로 변경할 수 있습니다. 이것은 chart.js의 기본 동작이 아닙니다. 이것은 계산 속성을 사용하는 것이 가장 좋습니다.

::: warning
 `position: relative`를 설정해야합니다.
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

### Custom/New Charts

경우에 따라 기본 Chart.js에 제공된 차트를 확장해야 합니다.
기본 차트를 확장하고 수정하는 방법 또는 자체 차트 유형을 만드는 방법에는 많은 예(http://www.chartjs.org/docs/latest/developers/charts.html)가 있습니다.

`vue-chartjs`도 이것과 거의 같은 방법으로 할 수 있습니다.### Custom/New Charts

경우에 따라 기본 Chart.js에 제공된 차트를 확장해야 합니다.
기본 차트를 확장하고 수정하는 방법 또는 자체 차트 유형을 만드는 방법에는 많은 예(http://www.chartjs.org/docs/latest/developers/charts.html)가 있습니다.

`vue-chartjs`도 이것과 거의 같은 방법으로 할 수 있습니다.

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

## 리소스

`vue-chartjs`를 사용하는 방법에 대한 자습서와 같은 몇 가지 리소스가 있습니다.

- [Using vue-chartjs with WordPress](https://medium.com/@apertureless/wordpress-vue-and-chart-js-6b61493e289f)
- [Create stunning Charts with Vue and Chart.js](https://hackernoon.com/creating-stunning-charts-with-vue-js-and-chart-js-28af584adc0a)
- [Let’s Build a Web App with Vue, Chart.js and an API Part I](https://hackernoon.com/lets-build-a-web-app-with-vue-chart-js-and-an-api-544eb81c4b44)
- [Let’s Build a Web App with Vue, Chart.js and an API Part II](https://hackernoon.com/lets-build-a-web-app-with-vue-chart-js-and-an-api-part-ii-39781b1d5acf)
- [Build a realtime chart with VueJS and Pusher](https://blog.pusher.com/build-realtime-chart-with-vuejs-pusher/)- [Using vue-chartjs with WordPress](https://medium.com/@apertureless/wordpress-vue-and-chart-js-6b61493e289f)
- [Create stunning Charts with Vue and Chart.js](https://hackernoon.com/creating-stunning-charts-with-vue-js-and-chart-js-28af584adc0a)
- [Let’s Build a Web App with Vue, Chart.js and an API Part I](https://hackernoon.com/lets-build-a-web-app-with-vue-chart-js-and-an-api-544eb81c4b44)
- [Let’s Build a Web App with Vue, Chart.js and an API Part II](https://hackernoon.com/lets-build-a-web-app-with-vue-chart-js-and-an-api-part-ii-39781b1d5acf)
- [Build a realtime chart with VueJS and Pusher](https://blog.pusher.com/build-realtime-chart-with-vuejs-pusher/)