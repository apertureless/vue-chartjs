---
search: ru
---

<div align="center">
  <img width="256" heigth="256" src="../../assets/vue-chartjs.png" alt="vue-chartjs logo">
</div>

[![npm version](https://badge.fury.io/js/vue-chartjs.svg)](https://badge.fury.io/js/vue-chartjs)
[![codecov](https://codecov.io/gh/apertureless/vue-chartjs/branch/master/graph/badge.svg)](https://codecov.io/gh/apertureless/vue-chartjs)
[![Build Status](https://travis-ci.org/apertureless/vue-chartjs.svg?branch=master)](https://travis-ci.org/apertureless/vue-chartjs)
[![Package Quality](http://npm.packagequality.com/shield/vue-chartjs.svg)](http://packagequality.com/#?package=vue-chartjs)
[![npm](https://img.shields.io/npm/dm/vue-chartjs.svg)](https://www.npmjs.com/package/vue-chartjs)
[![Gitter chat](https://img.shields.io/gitter/room/TechnologyAdvice/Stardust.svg)](https://gitter.im/vue-chartjs/Lobby)
[![license](https://img.shields.io/github/license/mashape/apistatus.svg)](https://github.com/apertureless/vue-chartjs/blob/master/LICENSE.txt)
[![CDNJS version](https://img.shields.io/cdnjs/v/vue-chartjs.svg)](https://cdnjs.com/libraries/vue-chartjs)

# vue-chartjs

**vue-chartjs** обертка для [Chart.js](https://github.com/chartjs/Chart.js) в vue. Вы можете с легкостью создавать многоразовые компоненты диаграмм.

## Демо & Документация

- 📺 [Demo](http://demo.vue-chartjs.org/)
- 📖 [Docs](http://www.vue-chartjs.org/)

### Совместимость

- v1 later `@legacy`
  - Vue.js 1.x
- v2 later
  - Vue.js 2.x

После филнального выпуска vue.js 2, вы получите v2 по умолчанию, если установите vue-chartjs через npm.
Больше нет необходимости в @next теге. Если вы нуждаетесь в v1, вам необходимо указать версию или использовать legacy тег.
Если вы ищите v1, проверьте эту [ветку](https://github.com/apertureless/vue-chartjs/tree/release/1.x).

## Установка

Просто выполните `yarn add vue-chartjs chart.js`

В случаи если вы хотите использовать библиотеку прямо в браузере, добавьте

```html
<script src="https://unpkg.com/vue-chartjs@2.6.0/dist/vue-chartjs.full.min.js"></script>
```
в ваши скрипты. Смотрите [Codepen](https://codepen.io/apertureless/pen/vxWbqB?editors=1010)

## Описание различий сборок

Существует три различные точки входа. Это зависит от того, какая сборка стоит у вас. Зависимости собираются или подключаются как peerDependency.

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

### Браузер
Вы можете использовать `vue-chartjs` прямо в браузере без установки каких-либо сборок. Пример на [codepen](https://codepen.io/apertureless/pen/vxWbqB?editors=1010). В этом случаи, пожалуйста, используйте `vue-chartjs.full.min.js`. Это минифицированноая версиея библиотеки, содержащая Vue.js и Chart.js в себе, с возможностью подключения при помощи UMD Module. Таким образом, вам необходим лишь один файл.


### Browserify / Webpack 1

Если вы используете Gulp, Browserify или Webpack 1, входная точка находится в `vue-chartjs.js`. Она __транслируется__ и __собирается__ при помощи UMD Module.

Однако Vue.js и Chart.js является `peerDependencies`, поэтому вы можете устанавливать их отдельно. В большинстве проектов вы в любом случаи будете иметь установленный `Vue.js`. В этом случаи, вы можете иметь различные версии Vue.js и Chart.js.

### Webpack 2
Если вы используете Webpack 2, он будет автоматически использовать `jsnext:main` / `module` в качестве входной точки, которая расположена в `es/index.js`.
Это транслированная es версия кода, которая не __собирается__ в модуль. Таким образом, three shaking будет работать.
Как и в собранной версии, `Vue.js` и `Chart.js` являются `peerDependencies` и не нуждаются в установке.


## Как использовать

Вам необходимо импортировать базовый класс диаграммы и унаследовать его. Это даст гораздо большую гибкость при работе с различными данными. Вы можете передать данные через props или vue-resource. 

Вы можете импортировать весь проект или каждый модуль по отдельности.

```javascript
import VueCharts from 'vue-chartjs'
import { Bar, Line } from 'vue-chartjs'
```

Просто создайте ваш собственный компонент.

```javascript
// CommitChart.js
import { Bar } from 'vue-chartjs'

export default Bar.extend({
  mounted () {
    // Переопределение базового рендер метода с реальными данными.
    this.renderChart({
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      datasets: [
        {
          label: 'GitHub Commits',
          backgroundColor: '#f87979',
          data: [40, 20, 12, 39, 10, 40, 39, 80, 40, 20, 12, 11]
        }
      ]
    })
  }
})
```

Затем просто импортируйте и используйте ваши собственные расширенные компоненты как обычные vue компоненты.

```javascript
import CommitChart from 'path/to/component/CommitChart'
```

## Другой пример с options

Вы можете переопределить стандартные опции графика. Просто передайте объект с опциями в качестве второго параметра в рендер метод.

```javascript
// MonthlyIncome.js
import { Line } from 'vue-chartjs'

export default Line.extend({
  props: ['data', 'options'],
  mounted () {
    this.renderChart(this.data, this.options)
  }
})
```

Используйте это в вашем vue приложении

```javascript
import MonthlyIncome from 'path/to/component/MonthlyIncome'

<template>
  <monthly-income :data={....} />
</template>

<script>
export default {
  components: { MonthlyIncome },
  ....
}
</script>
```

## Реактивность

Chart.js не обновляет и не перерисовывает диаграмму при передаче новых данных.
Впрочем, вы можете реализовать это самостоятельно или использовав один из двух подключенных миксинов:

- `reactiveProp`
- `reactiveData`

Оба включены в `mixins` модуль.

Миксины автоматически создают `chartData` в виде prop или data. И добавляют watcher. Если данные были измененны, график обновится.
Но помните про ограничение vue и javascript на изменений массивов и объектов. Больше информации можно получить [здесь](http://vue-chartjs.org/#/home?id=reactive-data)

```javascript
// MonthlyIncome.js
import { Line, mixins } from 'vue-chartjs'

export default Line.extend({
  mixins: [mixins.reactiveProp],
  props: ['chartData', 'options'],
  mounted () {
    this.renderChart(this.chartData, this.options)
  }
})

```

### Mixins модуль
Модуль `mixins` включен в `VueCharts`, а также доступен в виде отдельного модуля.
Несколько способов импортировать их:

```javascript
// Load complete module with all charts
import VueCharts from 'vue-chartjs'

export default VueCharts.Line.extend({
  mixins: [VueCharts.mixins.reactiveProp],
  props: ['chartData', 'options'],
  mounted () {
    this.renderChart(this.chartData, this.options)
  }
})
```

```javascript
// Load speperate modules
import { Line, mixins } from 'vue-chartjs'

export default Line.extend({
  mixins: [mixins.reactiveProp],
  props: ['chartData', 'options'],
  mounted () {
    this.renderChart(this.chartData, this.options)
  }
})
```

```javascript
// Load speperate modules with destructure assign
import { Line, mixins } from 'vue-chartjs'
const { reactiveProp } = mixins

export default Line.extend({
  mixins: [reactiveProp],
  props: ['chartData', 'options'],
  mounted () {
    this.renderChart(this.chartData, this.options)
  }
})
```

## Доступные диаграммы

### Bar Chart

![Bar](../assets/bar.png)

### Line Chart

![Line](../assets/line.png)

### Doughnut

![Doughnut](../assets/doughnut.png)

### Pie

![Pie](../assets/pie.png)

### Radar

![Pie](../assets/radar.png)

### Polar Area

![Pie](../assets/polar.png)

### Bubble

![Bubble](../assets/bubble.png)

### Scatter

![Scatter](../assets/scatter.png)

## Настройка сборки

``` bash
# инициализация зависимостей
npm install

# сборка с горячей заменой на localhost:8080
npm run dev

# сборка для production с минификацией
npm run build

# запуск unit тестов
npm run unit

# запуск e2e тестов
npm run e2e

# запуск всех тестов
npm test
```

Для детальных объяснений того, как это работает, перейдите в [руководство](http://vuejs-templates.github.io/webpack/) и [документацию для vue-loader](http://vuejs.github.io/vue-loader).

## Contributing

1. Fork it ( https://github.com/apertureless/vue-chartjs/fork )
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create a new Pull Request

## License

This software is distributed under [MIT license](LICENSE.txt).
