# Справочник

## Свойства

Существуют базовые свойства, определённые в компонентах, предоставленных `vue-chartjs`. Так как вы `extend`ите их, они *невидимы*, но вы можете переопределить их:

| Свойство | Описание |
|---|---|
| width | ширина графика |
| height | высота графика |
| chart-id | id canvas-элемента |
| css-classes | String с классами CSS для родительского элемента div |
| styles | Object со стилями CSS для родительского элемента div |
| plugins | Array с плагинами chartjs |

## События

Если миксин `reactiveData` или `reactiveProp` привязан, будут вызываться следующие события:

| Событие | Описание |
|---|---|
| `chart:render` | если миксин осуществляет полную перерисовку графика |
| `chart:destroy` | если миксин удаляет экземпляр объекта графика |
| `chart:update` | если миксин осуществеляет обновление графика вместо полной перерисовки |
| `labels:update` | если установлены новые метки |
| `xlabels:update` | если установлены новые метки по оси x |
| `ylabels:update` | если установлены новые метки по оси y |


## Глобальные методы
Глобальные методы, которые должны быть импортированы

### generateChart()

- **Тип:** `Function`
- **Аргументы:**: `chart-id`, `chart-type`
- **Использование:**

```js
import { generateChart } from 'vue-chartjs'
// First argument is the chart-id, second the chart type.
const CustomLine = generateChart('custom-line', 'LineWithLine')
```

## Методы экземпляра

Методы экземпляра могут быть использованы внутри вашего графика-компонента

### generateLegend()

Вспомогательная функция для генерации HTML-легенды

- **Тип:** `Function`
- **Использование:**

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

### addPlugin()

В Chart.js вы можете определить глобальные и встроенные плагины. Глобальные плагины без проблем работают с `vue-chartjs` как описано в [документации к Chart.js](http://www.chartjs.org/docs/latest/developers/plugins.html).

Если вы хотите добавить встроенные плагины, `vue-chartjs` предоставляет вспомогательный метод `addPlugin()`
Вам надо вызвать `addPlugin()` перед вызовом метода `renderChart()`.

- **Тип:** `Function`
- **Аргументы:**: `Array` плагинов
- **Использование:**

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

Создаёт экземпляр Chart.js и отрисовывает график.

- **Тип:** `Function`
- **Аргументы:**: `Chart Data`, `Chart Options`
- **Использование:**

```js
mounted () {
  this.renderChart({
    labels: ['Январь', 'Февраль'],
    datasets: [
      {
        label: 'Какие-то данные',
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

## Объект Chart.js

Вы можете получить доступ к объекту Chart.js из вашего графика-компонента посредством `this.$data._chart`

## Canvas-элемент

Вы можете получить доступ к canvas-элементу посредством `this.$refs.canvas`
