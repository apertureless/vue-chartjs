---
home: true
heroImage: /vue-chartjs.png
actionText: Get Started →
actionLink: /guide/
features:
- title: Easy
  details: Easy for both beginners and pros 🙌
- title: Extendable
  details: Simple to use, easy to extend 💪
- title: Powerfull
  details: With the full power of chart.js 💯
footer: MIT Licensed | Copyright © 2018-present Jakub Juszczak
---

# Comment commencer

**vue-chartjs** est un wrapper pour [Chart.js](https://github.com/chartjs/Chart.js) dans la Vue. Vous pouvez facilement créer des composants graphiques réutilisables avec.

## Introduction

`vue-chartjs` vous permet d'utiliser Chart.js dans la Vue sans trop de problèmes. C'est parfait pour les personnes qui ont besoins de graphiques simples et qui tournent aussi vite que possible.

Cela met de côté la logique de base mais oblige l'objet Chart.js a donner le maximum de flexibilité.

## Installation

### NPM

Vous pouvez installer `vue-chartjs` avec `npm`. Cependant, vous avez aussi besoin d'ajouter `chart.js` comme dépendance à votre projet. Parce que `Chart.js` est une peerDependency. Ainsi, vous avez un control total de la version de Chart.js.

`yarn add vue-chartjs chart.js` ou `npm install vue-chartjs chart.js --save`

::: Astuce
Si vous utilisez vue 1.x veuillez utiliser le `legacy` tag. Cependant la Vue 1 version n'est plus maintenue.

`yarn add vue-chartjs@legacy`
:::

### Navigateur

Vous pouvez aussi utiliser `vue-chartjs` directement dans le navigateur.
Premièrement ajouter le script `Chart.js` et ensuite le script `vue-chartjs`.

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.7.1/Chart.min.js"></script>
<script src="https://unpkg.com/vue-chartjs/dist/vue-chartjs.min.js"></script>
```

## Intégration

Tous les types de graphiques qui sont disponible dans `Chart.js` sont exportés comme un composant nommé (named component) et peuvent être importés comme tel. Ses composants sont des composants de Vue normaux, toutefois, vous avez besoin de les `étendre` (extend).

L'idée derrière `vue-chartjs` est de fournir des composants faciles à utiliser, avec le maximum de flexibilité et d'extensibilité. Pour cela, vous avez besoin de créer votre propre *Chart Component*  et de l'étendre (extend) avec le composant fourni : `vue-chartjs`.

Ainsi, les méthodes et la logique dans les Chart components, seront mergé dans votre chart component.

## Créer votre premier graphique

Vous avez besoin d'importer le chart de base et de l'étendre (extend). Cela donnera plus de flexibilité quand vous travaillerez avec différentes données. Vous pouvez encapsuler vos composants et utilisez des accessoires (props) pour  envoyer des données ou vous pouvez les insérer directement dans le composant. Cependant, votre composant ne sera plus réutilisable.

Vous pouvez importer tout le package ou chaque modules individuellement. Ensuite, vous aurez aussi besoin d'utiliser `extends:` ou `mixins:[]`. Et enfin dans le `mounted()` hook, appeler `this.renderChart()`. Cela va créer votre chart instance.

```js{1,4,6}
import { Bar } from 'vue-chartjs'

export default {
  extends: Bar,
  mounted () {
    this.renderChart(data, options)
  }
}
```

:::Astuce
Vous pouvez aussi utiliser `extends: Bar` ou `mixins: [Bar]`
:::

Cette méthode `this.renderChart()` est fourni par le `Bar` component et accepte deux parametres. Tous deux sont des `objects`. Le premier est votre chart data et le second est un options object.

Regarder la documentation officiel [Chart.js docs](http://www.chartjs.org/docs/latest/#creating-a-chart) pour voir la structure des objets que vous aurez à fournir.

### Vue Single File Components

Beaucoup d'exemples dans la documentation sont basés sur des fichiers javascript et pas des fichiers `.vue`. C'est parce que la plupart du temps vous aurez besoin du bloc `<script>`. Vous pouvez cependant utiliser des fichiers `.vue` sans problème.

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

::: danger Template Tag ne peux pas être mergé
N'insérer pas le tag `<template>` à votre fichier `.vue`. Vue **ne peux pas** merger des templates. Si vous ajouter un tag `<template>` vide, Vue va prendre le template de votre component et pas celui de l'extension, ce qui va donner  un template vide et des erreurs.
:::

## Updating Charts

Chart.js ne met pas à jour automatiquement les données si vous changer les datasets. Cependant, `vue-chartjs` fourni deux mixins pour le faire :

- `reactiveProp`
- `reactiveData`

Ces deux mixins font la même chose. La plupart du temps vous allez utiliser `reactiveProp`. Cela étend (extend) la logique de votre chart component et automatiquement créer un prop nommé `chartData` et ajoute une `vue watch` sur ce  prop. Quand les données sont changés, cela va aussi appelé `update()` seul les données dans le datasets ont changés ou `renderChart()` si un ou plsieurs nouveaux datasets ont été ajoutés.

`reactiveData` créer simplement une nouvelle variable chartData qui n'est pas une prop! et ajoute un watcher. C'est utile seulement si vous avez besoin d'un seul purpose charts et de faire un appel d'API dans votre chart component.

### Exemples

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

::: danger Limitations

[Caveats](https://vuejs.org/v2/guide/list.html#Caveats)
[Change-Detection-Caveats](https://vuejs.org/v2/guide/reactivity.html#Change-Detection-Caveats)
[vm.$watch](https://vuejs.org/v2/api/#vm-watch)

:::


### Evenements

La mixins réactive va émettre des évenements si les data changes. Vous pouvez les écouter, les voir avec `v:on` dans le chart component. Les évenements suivants sont implémentés :

- `chart:render` - Si la mixin fait un rerender complet
- `chart:destroy` - Si la mixin détruit l'instance de l'objet chart
- `chart:update` - Si la mixin fait une update à la place d'un re-render
- `labels:update` - Si un label a été changé
- `xlabels:update` Si xLabels a été changé
- `ylabels:update` - Si yLabels a été changé


### Troubleshooting/Problèmes

La réactivité du système n'est pour le moment pas **robuste**. vous aurez probablement des problèmes à ce propos, parce qu'il y a beaucoup de cas particuliers et de manières différentes d'envoyer vos données.

#### Options

L'objet `options` n'est pour l'instant pas réactif. Donc si vous changer dynamiquement les options de la chart, ces changements ne seront pas reconnus par la mixin.

Si vous utilisez la mixin vous avez besoin d'envoyer dans vos options dans un prop nommé `options`. C'est important parce que la mixin va appelée la méthode chart.js `update()` ou supprimé et renvoyé un nouveau chart. si la mixin renvoie un nouveau chart cela appel `this.renderChart(this.chartData, this.options)`.

Mais si vous passer vos options directement dans votre `mounted()` hook, elles seront perdues.

::: danger A ne pas faire
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

::: Comment il faut le faire
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

#### Votre watcher

Si vous changez souvent vos données (data) (au lieu d'en push de nouvelles) c'est le mieux, si vous implémenter votre propre watcher.
Vous pouvez aussi appelé `this.$data._chart.update()` ou `this.renderChart()` par vous même, cela dépend de vos besoins.

Un watcher simple serait :

```js
watch: {
  chartData () {
    this.$data._chart.update()
  }
}
```

## Exemples

### Chart avec des props

Votre objectif devrait être de créer des charts components réutilisables. Pour cela vous devriez utiliser les props de Vue.js pour envoyer vos options et vos chart data. De cette manière, le chart lui même se moque de traiter les données et s'occupe seulement de la présentaion.

Créer d'abord votre component

```js
import { Line } from 'vue-chartjs'

export default {
  extends: Line,
  props: {
    chartdata: {
      type: Object,
      default: null
    }
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

Après cela vous pouvez ajouter votre chart component a un parent component

```js
 <line-chart :chartdata="chartData" :options="chartOptions"/>
 ```

### Chart avec données local

Vous pouvez vous occuper des données de votre chart directement dans votre chart component. Vous avez seulement besoin de les envoyés dans la méthode `renderChart()`.

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

### Chart avec les données d'une API

C'est commun d'utiliser une API pour obtenir des données. Cependant, Il y a certaines choses à garder en tête. Le problème le plus courant est que vous créer d'abord votre chart component puis que vous envoyer les données depuis un appel asynchrone d'api. Le problème avec cette approche est que chart.js essaye de renvoyer votre chart et d'acceder aux données du chart, mais votre appel d'api est asynchrone. donc votre chart se créer avant que vos données n'arrivent.

Pour prévenir cela, un simple `v-if` est la meilleur solution.

Créer votre chart component avec des data prop et des options prop, comme cela on peut envoyer nos datas et options depuis un container component.

**Chart.vue**

```js
import { Line } from 'vue-chartjs'

export default {
  extends: Line,
  props: {
    chartdata: {
      type: Object,
      default: null
    }
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

Puis créer un container component, qui contienne votre appel d'api ou vuex connection.
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

### Chart avec style dynamique

Vous pouvez écrire `responsive: true` et l'envoyer dans un styles object qui est appelé comme un inline styles pour le div externe. Ainsi vous pouvez changer la largeur et la hauteur du container externe dynamiquement. Qui n'est pas  le behaviour par défaut du chart.js. Le mieux est d'utiliser les computed properties pour cela.

::: attention
 Vous avez besoin d'écrire `position: relative`
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

### Custom / nouveaux Charts

Parfois vous avez besoin d'étendre (extend) le Chart.js charts de base. Il y a beaucoup d'[exemples](http://www.chartjs.org/docs/latest/developers/charts.html) pour étendre (extend) et modifié les charts de base. Ou alors vous voulez créer votre propre type de chart.

Dans `vue-chartjs` vous pouvez faire cela prorement de la même manière.

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

## Documents et liens externes

Vous pouvez trouver ci-dessous des documents et liens externes tels que des tutoriels sur comment utiliser `vue-chartjs`.

- [Using vue-chartjs with WordPress](https://medium.com/@apertureless/wordpress-vue-and-chart-js-6b61493e289f)
- [Create stunning Charts with Vue and Chart.js](https://hackernoon.com/creating-stunning-charts-with-vue-js-and-chart-js-28af584adc0a)
- [Let’s Build a Web App with Vue, Chart.js and an API Part I](https://hackernoon.com/lets-build-a-web-app-with-vue-chart-js-and-an-api-544eb81c4b44)
- [Let’s Build a Web App with Vue, Chart.js and an API Part II](https://hackernoon.com/lets-build-a-web-app-with-vue-chart-js-and-an-api-part-ii-39781b1d5acf)
- [Build a realtime chart with VueJS and Pusher](https://blog.pusher.com/build-realtime-chart-with-vuejs-pusher/)

