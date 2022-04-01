# Для начинающих

**vue-chartjs** - это обёртка для [Chart.js](https://github.com/chartjs/Chart.js) на Vue. Вы можете леко создать переиспользуемые компоненты-графики.

## Вступление

`vue-chartjs` позволяет вам использовать Chart.js без излишнего шаманства с Vue. Идеально для людей, которые просто хотят получить работающие графики как можно быстрее.

Бизнес-логика абстрагируется, зато предоставляется доступ к объектам Chart.js для получения максимальной гибкости.

## Установка

### NPM

Вы можете установить `vue-chartjs` посредством `npm`. Однако, вам также нужно добавить `chart.js` как зависимость для вашего проекта. Потому, что `Chart.js` - это peerDependency. Таким образом вы получите полный контроль над версионированием Chart.js.

Установка посредством **npm**: `npm install vue-chartjs chart.js --save`

::: tip
Если вы используете vue 1.x пожалуйста, используйте тег `legacy`. Однако, помните, что Vue версии 1 больше не поддерживается.

`yarn add vue-chartjs@legacy`
:::


### YARN

Установка посредством **yarn**: `yarn add vue-chartjs chart.js`

### Браузер

Вы также можете использовать `vue-chartjs` прямо в браузере.
Для этого сначала добавьте скрипт Vue, если он ещё не загружен, потом - скрипт `Chart.js`, а после него - минимизированную версию скрипта `vue-chartjs`.
```html
<script src="https://unpkg.com/vue"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.7.1/Chart.min.js"></script>
<script src="https://unpkg.com/vue-chartjs/dist/vue-chartjs.min.js"></script>
```

Дальше вы можете просто зарегистрировать свой компонент:

```js
Vue.component('line-chart', {
  extends: VueChartJs.Line,
  mounted () {
    this.renderChart({
      labels: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
      datasets: [
        {
          label: 'Коммиты на GitHub',
          backgroundColor: '#f87979',
          data: [40, 20, 12, 39, 10, 40, 39, 80, 40, 20, 12, 11]
        }
      ]
    }, {responsive: true, maintainAspectRatio: false})
  }
})
```

[Пример на Сodepen](https://codepen.io/apertureless/pen/zEvvWM).

## Интеграция

Каждый тип графика, доступный в `Chart.js`, экспортируется как именованый компонент и может быть импортирован как таковой. Эти компоненты - нормальные Vue-компоненты, однако вам необходимо расширять их.

Идея, стоящая за `vue-chart.js`, состоит в том, чтобы предоставить простые в использовании компоненты, с максимумом гибкости и расширяемости. Для достижения этого, вам нужно создать ваш собственный график-компонент и расширить его предоставленными `vue-chart.js` компонентами.

Таким образом, методы и логика графиков-компонентов включается в ваш график-компонент.


## Создание вашего первого графика

Вам необходимо импортировать базовый компонент, а затем расширить его. Это даёт больше гибкости при работе с различными данными. Однако, ваш компонент не может быть переиспользован таким образом.

Вы можете импортировать весь пакет или каждый модуль отдельно. Потом вам нужно использовать `extends:` или `mixins:[]`. Далее, в хуке `mounted()`, вызовите `this.renderChart()`. Это создаст экземпляр вашего объекта.

```javascript {1,4,6}
import { Bar } from 'vue-chartjs'

export default {
  extends: Bar,
  mounted () {
    this.renderChart(data, options)
  }
}
```

:::tip
Вы можете использовать или `extends: Bar` или `mixins: [Bar]`
:::

Метод `this.renderChart()` предоставляется компонентом `Bar` и принимает два параметра. Об являются `objects`. Первый используется для данных вашего графика, а второй - как объект опций.

Со структурой этих объектов можете ознакомиться в [официальной документации Chart.js](http://www.chartjs.org/docs/latest/#creating-a-chart)

## Однофайловые компоненты Vue

Большинство примеров в документации базируется на javascript-файлах, а не на `.vue` файлах. Причиной этому является то, что в большинстве случаев вам понадобится только блок `<script>`. Однако, вы можете использовать и `.vue` файлы.

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

::: danger Template-теги не объединяются
**Не** включайте тег `<template></template>` в ваши `.vue` файлы компонентов. Vue **не** может объединять шаблоны. И шаблон включается в миксин. Если вы добавите пустой тег шаблона в вашем компоненте, он перезапишет тот, который приходит из базового графика, и вы получите пустой экран.
:::

## Обновление графиков

Chart.js не обновляет и не перерисовывает график если новые данные были переданы.
Однако, вы можете просто реализовать это сами или использовать один из двух уже реализованных миксинов:

- `reactiveProp`
- `reactiveData`

Оба включены в модуль `mixins` и оба преследуют одну цель. В большинстве случаев вы будете использовать `reactiveProp`. Этот миксин расширяет логику вашего графика-компонента и автоматически создаёт свойства `chartData` и автоматически добавляет `vue watch` на это свойство. При изменении данных, он или вызовет `update()`, если изменились только данные внутри уже существующих `datasets`, или `renderChart()`, если были добавлены новые наборы данных.

`reactiveData` просто создаёт локальную переменную `chartData` (которая не является свойством!) и добавляет watcher. Это полезно только в том случае, если вам необходимы одноцелевые графики и вы совершаете API-вызовы внутри ваших графиков-компонентов.

### Пример

**LineChart.js**
```javascript
import { Line, mixins } from 'vue-chartjs'
const { reactiveProp } = mixins

export default {
  extends: Line,
  mixins: [reactiveProp],
  props: ['options'],
  mounted () {
    // this.chartData создаётся внутри миксина.
    // Если вы хотите передать опции, создайте локальный объект options
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

::: danger Ограничения Vue по мутации массивов и объектов

[Caveats](https://vuejs.org/v2/guide/list.html#Caveats)
[Change-Detection-Caveats](https://vuejs.org/v2/guide/reactivity.html#Change-Detection-Caveats)
[vm.$watch](https://vuejs.org/v2/api/#vm-watch)

:::


### События

Реактивные миксины вызывают события при изменении данных. Вы можете прослушивать их при помощи `v:on` на графике-компоненте. Доступны следующие события:

- `chart:render` - если миксин выполняет полную перерисовку графика
- `chart:destroy` - если миксин удаляет объект графика
- `chart:update` - если миксин совершает обновление вместо полной перерисовки
- `labels:update` - если были установлены новые метки
- `xlabels:update` - если новые метки были установлены по оси x
- `ylabels:update` - если новые метки были установлены по оси y


### Отлов ошибок

Система реактивности в её текущем состоянии **незрелая**. Вы столкнётесь с некоторыми проблемами с ней, так как существует множество путей использования и путей передачи ваших данных.

#### Опции

Объект `options` на данный момент не является реактивным. Если вы хотите динамически измените опции графика, это не будет распозно миксином.

Если вы используете миксин, вам нужно передать опции как свойство `options`. Это важно, так как миксин вызовет метод `update()` из chart.js или уничтожит старый и отрисует новый график. Если миксин отрисовывает новый график, он вызывает `this.renderChart(this.chartData, this.options)`.

Но если вы передаёте опции напрямую в вашем хуке `mounted()`, они теряются.

::: danger Неправильно
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

::: tip Правильно
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

#### Собственный watcher

Если вы часто преобразуете или изменяете данные (вместо передачи новых данных), вам лучше реализовать свой собственный watcher.
Вы можете самостоятельно вызвать `this.$data._chart.update()` или `this.renderChart()`, в зависимости от ваших потребностей.

Простой watcher выглядит так:

```js
watch: {
  chartData () {
    this.$data._chart.update()
  }
}
```

## Примеры

### Графики со свойствами

Вашей целью должно быть создание переиспользуемых компонентов-графиков. Для этой цели, вам необходимо использовать свойства Vue.js для передачи опций и данных для графика. Таким образом, график сам по себе не занимается стягиванием данных, а только их отображением.

В первую очередь, создайте свой компонент:

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

После этого добавьте свой график-компонент в родительский компонент:

```js
<line-chart :chartdata="chartData" :options="chartOptions"/>
```

### График с локальными данными

Вы можете передать данные напрямую в ваш график-компонент. Для этого просто передайте его в метод `renderChart()`:

```js
import { Bar } from 'vue-chartjs'

export default {
  extends: Bar,
  data: () => ({
    chartdata: {
      labels: ['Январь', 'Февраль'],
      datasets: [
        {
          label: 'Данные 1',
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

### График с данными с API

Популярной моделью использования является запрос данных с API. Однако, необходимо кое-что запомнить. Самой частой проблемой является то, что вы встраиваете график-компонент напрямую и передаёте ему данные из асинхронного API-вызова. Проблема с этим подходом состоит в том, что график отрисовывается ранее, чем приходят данные из асинхронного API-вызова.

Лучшее решение для предупреждения таких ситуаций - это использование `v-if`.

Создавайте ваш график-компонент со свойствами данных и опций, чтобы вы могли передать их через компонент-контейнер:

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

Далее создавайте компонент-контейнер, который занимается API-вызовами или vuex-соединением:

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

### График с динамическими стилями

Вы можете установить `responsive: true` и передать объект стилей, который будет применён как встроенный стиль для внешнего блока div. Таким образом вы можете динамически изменять высоту и ширину внешнего контейнера, что не является поведением по умолчанию для chart.js. Лучше всего использовать для этого вычисляемые параметры.

::: warning
 Вам необходимо установить `position: relative`
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

### Настраиваемые / новые графики

Иногда вам нужно расширить обычные графики Chart.js. Существует множество [примеров](http://www.chartjs.org/docs/latest/developers/charts.html), как расширить или модифицировать графики по умолчанию, или создать собственный тип графика.

В `vue-chartjs`, вы можете сделать это практически таким же путём:

```js
// 1. Импортируйте Chart.js, чтобы использовать глобальный объект Chart
import Chart from 'chart.js'
// 2. Импортируйте метод `generateChart()` для создания компонента vue
import { generateChart } from 'vue-chartjs'

// 3. Расширьте один из графиков по умолчанию
// http://www.chartjs.org/docs/latest/developers/charts.html
Chart.defaults.LineWithLine = Chart.defaults.line;
Chart.controllers.LineWithLine = Chart.controllers.line.extend({ /* ваши расширения */})

// 4. Сгенерируйте компонент vue-chartjs
// Первый аргумент - это chart-id, второй - типа графика
const CustomLine = generateChart('custom-line', 'LineWithLine')

// 5. Расширьте компонент CustomLine так же, как вы это делаете с обычными графиками vue-chartjs

export default {
  extends: CustomLine,
  mounted () {
    // ....
  }
}
```

## Ресурсы

Вас могут также заинтересовать руководства по использованию `vue-chartjs` на других ресурсах:

- [Using vue-chartjs with WordPress](https://medium.com/@apertureless/wordpress-vue-and-chart-js-6b61493e289f)
- [Create stunning Charts with Vue and Chart.js](https://hackernoon.com/creating-stunning-charts-with-vue-js-and-chart-js-28af584adc0a)
- [Let’s Build a Web App with Vue, Chart.js and an API Part I](https://hackernoon.com/lets-build-a-web-app-with-vue-chart-js-and-an-api-544eb81c4b44)
- [Let’s Build a Web App with Vue, Chart.js and an API Part II](https://hackernoon.com/lets-build-a-web-app-with-vue-chart-js-and-an-api-part-ii-39781b1d5acf)
- [Build a realtime chart with VueJS and Pusher](https://blog.pusher.com/build-realtime-chart-with-vuejs-pusher/)
