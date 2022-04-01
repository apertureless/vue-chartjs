# Referência de codificação

## Props

Existem alguns props básicas definidas nos componentes fornecidos pelo `vue-chartjs`. Porque você os `estende`, eles são _invisíveis_, mas você pode substituí-los:

| Prop        | Descrição                                               |
| ----------- | ------------------------------------------------------- |
| width       | largura do gráfico                                      |
| height      | altura do gráfico                                       |
| chart-id    | Id da tela                                              |
| css-classes | String com classes css para a div circundante           |
| styles      | Objeto com estilos css para o div contêiner circundante |
| plugins     | Array com plugins chartjs                               |

## Eventos

Se o mixin `reactiveData` ou `reactiveProp` estiver anexado, os seguintes eventos serão emitidos:

| Evento           | Descrição                                                           |
| ---------------- | ------------------------------------------------------------------- |
| `chart:render`   | se o mixin executar um renderizador completo                        |
| `chart:destroy`  | se o mixin excluir a instância do objeto de gráfico                 |
| `chart:update`   | se o mixin executar uma atualização em vez de uma nova renderização |
| `labels:update`  | se novos labals foram definidos                                     |
| `xlabels:update` | se novos xLabels foram definidos                                    |
| `ylabels:update` | se novos yLabels foram definidos                                    |

## Métodos Globais

Os métodos globais precisam ser importados.

### generateChart

- **Tipo:** `Function`
- **Argumentos**: `chart-id`, `chart-type`
- **Uso:**

```js
import { generateChart } from "vue-chartjs";
// O primeiro argumento é o ID do gráfico, depois o tipo de gráfico.
const CustomLine = generateChart("custom-line", "LineWithLine");
```

## Métodos de instância

Os métodos de instância podem ser usados ​​dentro do componente do gráfico.

### generateLegend()

Função auxiliar para gerar uma legenda HTML.

- **Tipo:** `Function`
- **Argumentos**: `none`
- **Uso:**

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

### addPlugin

No Chart.js, você pode definir plugins globais e embutidos. Os plug-ins globais estão funcionando sem problemas com o `vue-chartjs` como descrito no [Chart.js docs](http://www.chartjs.org/docs/latest/developers/plugins.html).

Se você deseja adicionar plug-ins embutidos, `vue-chartjs` expõe um método auxiliar chamado `addPlugin()`
Você deve chamar `addPlugin()` antes do método `renderChart()`.

- **Tipo:** `Function`
- **Argumentos**: `Array` de Plugins
- **Uso:**

```js
mounted () {
  this.addPlugin({
    id: 'my-plugin',
    beforeInit: function (chart) {
      ...
    }
  })
}
```

### renderChart()

Cria uma instância Chart.js e renderiza o gráfico.

- **Tipo:** `Function`
- **Argumentos**: `Chart Data`, `Chart Options`
- **Uso:**

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

## Objeto Chart.js

Você pode acessar o objeto Chart.js dentro do componente do gráfico com `this.$data._chart`

## Canvas

Você pode acessar canvas com `this.$refs.canvas`
