# Começando

**vue-chartjs** é um pacote para [Chart.js](https://github.com/chartjs/Chart.js) no Vue. Com ele você pode criar facilmente componentes de ​gráficos reutilizáveis.

## Introdução

`vue-chartjs` permite você usar Chart.js sem muito aborrecimento dentro do Vue. É perfeito para pessoas que precisam de gráficos simples em funcionamento o mais rápido possível.

Abstrai a lógica básica, mas expõe o objeto Chart.js para oferecer a máxima flexibilidade.

## Instalação

### NPM

Você pode instalar o `vue-chartjs` através do `npm` ou `yarn`. No entanto, você também precisa adicionar o `chart.js` como uma dependência ao seu projeto, porque o `Chart.js` é um parDeDependência. Dessa forma, você tem total controle sobre o versionamento do `Chart.js`.

```bash
npm install vue-chartjs chart.js --save
```

```bash
yarn add vue-chartjs chart.js
```

::: tip Dica
Se você estiver utilizando vue 1.x por favor use a tag `legacy`. No entanto, a versão 1 do Vue não é mais mantida.

`yarn add vue-chartjs@legacy`
:::

### Navegador

Você também pode usar `vue-chartjs` diretamente no navegador via CDN.
Primeiro, adicione o script do `Chart.js`, e depois adicione o script `vue-chartjs`.

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.7.1/Chart.min.js"></script>
<script src="https://unpkg.com/vue-chartjs/dist/vue-chartjs.min.js"></script>
```

## Integração

Todo tipo de gráfico disponível em `Chart.js` é exportado como um componente nomeado e pode ser importado como tal. Esses componentes são componentes normais do Vue, no entanto, você precisa estendê-lo com `extend`.

A ideia por trás do `vue-chartjs` é fornecer componentes fáceis de usar, com máxima flexibilidade e extensibilidade. Para alcançar isto, você precisa criar o seu próprio _Componente de gráfico_ e estendê-lo com os componentes `vue-chartjs` fornecidos.

Dessa forma, os métodos e a lógica nos componentes do gráfico são mesclados no seu próprio componente de gráfico.

## Criando seu primeiro Gráfico

primeiro, você precisa importar o gráfico base e estendê-lo. Isso oferece mais flexibilidade ao trabalhar com dados diferentes. Você pode encapsular seus componentes e usar objetos para passar dados, ou você pode inseri-los diretamente dentro do componente. No entanto, seu componente não é reutilizável dessa maneira.

Você pode importar o pacote inteiro ou cada módulo individualmente. Então, você precisa usar `extends:` ou `mixins:[]`. Depois, no gancho `mounted()`, chame `this.renderChart()`. Isso criará sua instância do gráfico.

```js{1,4,6}
import { Bar } from "vue-chartjs";

export default {
  extends: Bar,
  mounted() {
    this.renderChart(data, options);
  }
};
```

:::tip Dica
Você pode usar `extends: Bar` ou `mixins: [Bar]`
:::

O método `this.renderChart()` é fornecido pelo componente `Bar` e aceita dois parâmetros: ambos são `objetos`. O primeiro são os dados do gráfico, e o segundo é um objeto de opções.

Confira o oficial [Chart.js docs](http://www.chartjs.org/docs/latest/#creating-a-chart) para ver a estrutura do objeto que você precisa fornecer.

### Componentes de arquivo único do Vue

A maioria dos exemplos nos documentos é baseada em arquivos JavaScript e não em arquivos `.vue`. Isso ocorre porque, principalmente, você precisará apenas do bloco `<script>`. No entanto, você também pode usar componentes single-file `.vue`.

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

::: danger A tag template não pode ser mesclada
Não inclua a tag `<template>` em seus componentes single-file `.vue`. Vue pode **não** mesclar templates. Se você adicionar uma tag `<template>` vazia, o Vue pegará o modelo do seu componente e não do estendido, o que resultará em um template vazio e erros inesperados.
:::

## Atualizando Gráficos

`Chart.js` não fornece uma atualização ao vivo se você alterar os conjuntos de dados. No entanto, `vue-chartjs` fornece dois mixins para atingir esse objetivo:

- `reactiveProp`
- `reactiveData`

Ambos os mixins alcançam o mesmo resultado. Na maioria das vezes você usará `reactiveProp`. Ele estende a lógica do seu componente de gráfico e cria automaticamente um objeto chamado `chartData` e adiciona um `vue watch` neste objeto. Na mutação de dados, ele chamará `update()` se os dados dentro dos conjuntos de dados foram alterados, ou `renderChart()` se novos conjuntos de dados foram adicionados.

`reactiveData` simplesmente cria uma variável local `chartData` (o que não é um `objeto`!) e adiciona um observador. Isso é útil apenas se você precisar de gráficos de finalidade única ou precisar de uma chamada de API dentro do componente do gráfico.

### Exemplo

**LineChart.js**

```js
import { Line, mixins } from "vue-chartjs";
const { reactiveProp } = mixins;

export default {
  extends: Line,
  mixins: [reactiveProp],
  props: ["options"],
  mounted() {
    // this.chartData é criado no mixin.
    // Se você deseja passar opções, crie um objeto de opções locais
    this.renderChart(this.chartData, this.options);
  }
};
```

**RandomChart.vue**

```vue
<template>
  <div class="small">
    <line-chart :chart-data="datacollection"></line-chart>
    <button @click="fillData()">Randomize</button>
  </div>
</template>

<script>
import LineChart from "./LineChart.js";

export default {
  components: {
    LineChart
  },
  data() {
    return {
      datacollection: null
    };
  },
  mounted() {
    this.fillData();
  },
  methods: {
    fillData() {
      this.datacollection = {
        labels: [this.getRandomInt(), this.getRandomInt()],
        datasets: [
          {
            label: "Data One",
            backgroundColor: "#f87979",
            data: [this.getRandomInt(), this.getRandomInt()]
          },
          {
            label: "Data One",
            backgroundColor: "#f87979",
            data: [this.getRandomInt(), this.getRandomInt()]
          }
        ]
      };
    },
    getRandomInt() {
      return Math.floor(Math.random() * (50 - 5 + 1)) + 5;
    }
  }
};
</script>

<style>
.small {
  max-width: 600px;
  margin: 150px auto;
}
</style>
```

::: danger Limitações

[Caveats](https://vuejs.org/v2/guide/list.html#Caveats)
[Change-Detection-Caveats](https://vuejs.org/v2/guide/reactivity.html#Change-Detection-Caveats)
[vm.\$watch](https://vuejs.org/v2/api/#vm-watch)

:::

### Eventos

Esses mixins reativos emitem eventos se os dados forem alterados. Você pode ouvi-los com `v:on` no componente do gráfico. Os seguintes eventos estão disponíveis:

- `chart:render` - se o mixin executar um renderizador completo
- `chart:destroy` - se o mixin excluir a instância do objeto de gráfico
- `chart:update` - se o mixin executar uma atualização em vez de uma nova renderização
- `labels:update` - se novos labels foram definidos
- `xlabels:update` se novos xLabels foram definidos
- `ylabels:update` - se novos yLabels foram definidos

### Solução de problemas

O sistema de reatividade em seu estado atual não é **robusto**. Você terá vários problemas com isso, porque existem muitos casos de uso e maneiras de passar seus dados.

#### Opções

O objeto `options` não está atualmente implementado reativamente. Portanto, se você alterar dinamicamente as opções do gráfico, eles não serão reconhecidos pelo mixin. Se necessário, você pode criar um observador para destruir e renderizar novamente quando as opções do gráfico forem atualizadas.

Se você estiver usando o mixin, precisará passar suas opções como um objeto chamado `options`. Isso é importante porque o mixin chamará o método `update ()` do Chart.js ou destruirá e renderizará um novo gráfico. Se o mixin renderizar um novo gráfico, ele chamará `this.renderChart(this.chartData, this.options)`.

Mas, se você passar suas opções diretamente no seu gancho `mounted()`, elas serão destruídas.

::: danger Maneira errada

```js{7}
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

::: tip Maneira Certo

```js{7}
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

#### Próprio observador

Se você transformar seus dados, mutação (em vez de enviar novos dados), é o melhor método, se você implementar seu próprio observador.
Você pode chamar `this.$data._chart.update()` ou `this.renderChart()` de forma independente, dependendo de suas necessidades.

Um observador simples seria:

```js
watch: {
  chartData () {
    this.$data._chart.update()
  }
}
```

## Exemplos

### Gráfico com props

Seu objetivo deve ser criar componentes reutilizáveis ​​do gráfico. Para esse fim, você deve utilizar as `props` do Vue.js para passar suas opções e seus dados do gráfico. Dessa forma, o próprio gráfico não possui uma opinião sobre a busca de dados e é apenas para apresentação.

Primeiro, crie seu componente:

```js
import { Line } from "vue-chartjs";

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
  mounted() {
    this.renderChart(this.chartdata, this.options);
  }
};
```

Depois disso, você pode adicionar o componente do gráfico a um componente pai:

```vue
<line-chart :chartdata="chartData" :options="chartOptions" />
```

### Gráfico com dados locais

Você pode manipular os dados do gráfico diretamente em seu próprio componente do gráfico. Você só precisa passá-lo para o método `renderChart()`:

```js
import { Bar } from "vue-chartjs";

export default {
  extends: Bar,
  data: () => ({
    chartdata: {
      labels: ["January", "February"],
      datasets: [
        {
          label: "Data One",
          backgroundColor: "#f87979",
          data: [40, 20]
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false
    }
  }),

  mounted() {
    this.renderChart(this.chartdata, this.options);
  }
};
```

### Gráfico com dados da API

Um padrão comum é usar uma API para recuperar seus dados. No entanto, existem algumas coisas para ter em mente. O problema mais comum é que você monta o componente do gráfico diretamente e transmite dados de uma chamada de API assíncrona. O problema dessa abordagem é que o Chart.js tenta renderizar seu gráfico e acessar os dados do gráfico de forma sincronizada, para que o gráfico seja montado antes que os dados da API cheguem.

Para evitar isso, um simples `v-if` é a melhor solução.

Crie seu componente de gráfico com um objeto de dados e opções, para que possamos transmitir nossos dados e opções de um componente de contêiner.

**Chart.vue**

```js
import { Line } from "vue-chartjs";

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
  mounted() {
    this.renderChart(this.chartdata, this.options);
  }
};
```

Em seguida, crie um componente de contêiner, que lida com a chamada da API ou a conexão vuex.

**ChartContainer.vue**

```html {3}
<template>
  <div class="container">
    <line-chart v-if="loaded" :chartdata="chartdata" :options="options" />
  </div>
</template>

<script>
  import LineChart from "./Chart.vue";

  export default {
    name: "LineChartContainer",
    components: { LineChart },
    data: () => ({
      loaded: false,
      chartdata: null
    }),
    async mounted() {
      this.loaded = false;
      try {
        const { userlist } = await fetch("/api/userlist");
        this.chartdata = userlist;
        this.loaded = true;
      } catch (e) {
        console.error(e);
      }
    }
  };
</script>
```

### Gráfico com estilos dinâmicos

Você pode definir `responsive: true` e passar um objeto de estilos que é aplicado como estilos embutidos para o exterior `<div>`. Dessa forma, você pode alterar a altura e a largura do contêiner externo dinamicamente, o que não é o comportamento padrão do Chart.js. É melhor usar propriedades computadas para isso.

::: warning Aviso
Você precisa definir `position: relative`
:::

```html
<template>
  <div>
    <line-chart :styles="myStyles" />
    <button @click="increase()">Increase height</button>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        height: 300
      };
    },
    methods: {
      increase() {
        this.height += 10;
      }
    },
    computed: {
      myStyles() {
        return {
          height: `${this.height}px`,
          position: "relative"
        };
      }
    }
  };
</script>
```

### Personalizados / Novos Gráficos

Às vezes, você precisa estender os gráficos Chart.js padrão. Existem muitos [exemplos](http://www.chartjs.org/docs/latest/developers/charts.html) sobre como estender e modificar os gráficos padrão. Ou você pode criar seu próprio tipo de gráfico.

No `vue-chartjs`, você pode fazer isso da mesma maneira:

```js
// 1. Importar Chart.js para que você possa usar o objeto Chart global
import Chart from "chart.js";
// 2. Importar o metodo `generateChart()` para criar o componente vue.
import { generateChart } from "vue-chartjs";

// 3. Estenda um dos gráficos padrão
// http://www.chartjs.org/docs/latest/developers/charts.html
Chart.defaults.LineWithLine = Chart.defaults.line;
Chart.controllers.LineWithLine = Chart.controllers.line.extend({
  /* personalize sua magica aqui */
});

// 4. Gere o componente vue-chartjs
// O primeiro argumento é o ID do gráfico, depois o tipo de gráfico.
const CustomLine = generateChart("custom-line", "LineWithLine");

// 5. Estender o component CustomLine assim como você faz com os gráficos vue-chartjs padrão.

export default {
  extends: CustomLine,
  mounted() {
    // ....
  }
};
```

## Recursos

Aqui estão alguns recursos, como tutoriais, sobre como usar `vue-chartjs`:

- [Usando vue-chartjs com WordPress](https://medium.com/@apertureless/wordpress-vue-and-chart-js-6b61493e289f)
- [Crie gráficos impressionantes com Vue e Chart.js](https://hackernoon.com/creating-stunning-charts-with-vue-js-and-chart-js-28af584adc0a)
- [Vamos construir um aplicativo web com Vue, Chart.js e uma API Parte I](https://hackernoon.com/lets-build-a-web-app-with-vue-chart-js-and-an-api-544eb81c4b44)
- [Vamos construir um aplicativo web com Vue, Chart.js e uma API Parte II](https://hackernoon.com/lets-build-a-web-app-with-vue-chart-js-and-an-api-part-ii-39781b1d5acf)
- [Construir um gráfico em tempo real com VueJS e Pusher](https://blog.pusher.com/build-realtime-chart-with-vuejs-pusher/)
