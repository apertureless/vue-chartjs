---
search: fr-fr
---

# vue-chartjs
**vue-chartjs** is a wrapper for [Chart.js](https://github.com/chartjs/Chart.js) in vue. You can easily create reuseable chart components.

## Introduction
`vue-chartjs` vous permet d'utiliser chart.js avec vue sans prise de tête. C'est la solution idéale pour ceux qui souhaitent créer des graphes simplement et rapidement.

La logique interne de chart.js est abstraite, mais l'objet sous-jacent est exposé, de sorte que vous puissiez bénéficier de la plus grande flexibilité possible.

## Installation
Si vous travaillez avec Vue.js 2+, exécutez simplement :

`yarn add vue-chartjs chart.js`

Avec vue 1.x, il vous faudra utiliser le marqueur `legacy`. Notez toutefois que la version 1 de vue n'est plus maintenue à l'heure actuelle.

`yarn add vue-chartjs@legacy`

## Démarrage rapide

Importez l'objet graphe de base afin de l'étendre. Cette façon de faire offre beaucoup plus de flexibilité lorsque plusieurs sources de données sont utilisées.
Il est possible d'encapsuler vos composants et d'utiliser les props pour transmettre les données, ou vous pouvez également les indiquer directement à l'intérieur du composant. Cependant, cette seconde méthode ne créera pas des composants réutilisables.

Vous pouvez choisir d'importer le package dans son intégralité, ou chaque composant individuellement.

```javascript
// CommitChart.js
import { Bar } from 'vue-chartjs'

export default {
  extends: Bar,
  mounted () {
    // Surcharge de la méthode render avec les données.
    this.renderChart(data, options)
  }
}
```

La méthode `renderChart()` prend deux paramètres :

- un objet de données
- un objet d'options

### Objet de données

L'objet de données prend la structure suivante :

```javascript
{
  labels: ['Janvier', 'Février'],
  datasets: [
    {
      label: 'Commits sur GitHub',
      backgroundColor: '#f87979',
      data: [40, 20]
    }
  ]
}
```

Pour plus d'informations, vous pouvez lire la documentation [Chart.js](http://www.chartjs.org/docs/#chart-configuration-chart-data).

## Props

Certains props de base sont définis dans BaseCharts. Grâce à l'héritage de l'opération `extend()`, ceux-ci peuvent être surchargés, bien qu'ils soient *invisibles*.

| Prop | Description |
|---|---|
| width | largeur du graphe |
| height | hauteur du graphe |
| chart-id | id du canvas |
| css-classes | Chaîne de caractères avec les classes CSS à appliquer à l'élément div parent |
| styles | Object avec les styles CSS à appliquer à l'élément div parent |

## Exemples

Voici quelques exemples.

### Graphe avec props

Vous pouvez créer les props data et options à transmetttre au graphe.

```javascript
// LineChart.js
import { Line } from 'vue-chartjs'

export default {
  extends: Line,
  props: ['data', 'options'],
  mounted () {
    this.renderChart(this.data, this.options)
  }
}
```

Vous pourrez les utiliser après avoir ajouté votre composant :

```html
 <line-chart :data="{votre objet de données}" :options="{vos options}"></line-chart>
```

Si vous souhaitez modifier la hauteur ou la largeur :

```html
 <line-chart
  :data="{votre objet de données}"
  :options="{responsive: false, maintainAspectRatio: false}"
  :width="400"
  :height="200"
  >
 </line-chart>
```

<p class="warning">
Vous devrez préciser `responsive: false` si vous souhaitez appliquer une taille fixe avec `width` et `height`.
</p>

### Graphe avec données locales

```javascript
import {Bar} from 'vue-chartjs'

export default {
  extends: Bar,
  data () {
    return {
      datacollection: {
        labels: ['Janvier', 'Février'],
        datasets: [
          {
            label: 'Data One',
            backgroundColor: '#f87979',
            data: [40, 20]
          }
        ]
      }
    }
  },
  mounted () {
    this.renderChart(this.datacollection, {responsive: true, maintainAspectRatio: false})
  }
}
```

### Composants réutilisables

Si vous souhaitez faire en sorte que vos composants restent réutilisables, le mieux est de leur appliquer un wrapper. De cette manière, le composant graphique est seulement responsable de la représentation de la donnée, alors que le wrapper se charge de la logique derrière elle. Il y a de nombreux cas d'utilisations, et la manière de faire sera différente si vous êtes sur une Application Monopage (SPA) ou si vous intégrez sur du Laravel par exemple.

## Données en direct

Chart.js ne fournit pas de mécanisme de mise à jour automatique si jamais vous deviez modifier vos jeux de données. Cependant, `vue-chartjs` met à disposition deux mixins pour cela :

- `reactiveProp`
- `reactiveData`

Tous deux réalisent le même travail. La plupart du temps, c'est `reactiveProp` que vous utiliserez. Il reprend la logique de votre composant graphique, et crée automatiquement une prop `chartData` et ajoute une `vue watch` sur celle-ci. Lorsque la donnée change, `update()` sera appelée si c'est seulement le coeur de la donnée qui est modifié, et `renderChart()` si de nouveaux jeux de données ont été ajoutés.

`reactiveData` crée une variable locale chartData (pas une prop !), et lui ajoute un watcher.
Le seul cas d'utilisation est celui où vous souhaitez un graphe à usage unique, et que vous effectuez des appels API à l'intérieur même du composant.

```javascript
data () {
  return {
    chartData: null
  }
}
```

### Exemple

**LineChart.js**

```javascript
import { Line, mixins } from 'vue-chartjs'
const { reactiveProp } = mixins

export default {
  extends: Line,
  mixins: [reactiveProp],
  props: ['options'],
  mounted () {
    // this.chartData est créé par le mixin.
    // si vous voulez transmettre des options, il faudra créer une variable locale
    this.renderChart(this.chartData, this.options)
  }
}
```

**RandomChart.vue**

```javascript
<template>
  <div class="small">
    <line-chart :chart-data="datacollection"></line-chart>
    <button @click="fillData()">Aléatoire</button>
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
  ⚠ Attention : si vous permutez vos données dans un composant parent puis les transmettez à un composant enfant, gardez à l'esprit les limitations de javascript.
  Plus d'infos sur [issue#44](https://github.com/apertureless/vue-chartjs/issues/44).
</p>

### Limitations
  <ul>
    <li>[Mises en garde](https://vuejs.org/v2/guide/list.html#Caveats)</li>
    <li>[Mise en garde sur la détection des modifications](https://vuejs.org/v2/guide/reactivity.html#Change-Detection-Caveats)</li>
    <li>[vm.$watch](https://vuejs.org/v2/api/#vm-watch)</li>
  </ul>

## Objet Chart.js

Il peut arriver d'avoir besoin de plus de contrôle sur l'objet chart.js. Vous pouvez, à cet effet, accéder à cet objet via `this.$data._chart`.

## Plugins inline

Avec Chart.js, vous pouvez définir des pugins globaux ou inline. Les plugins globaux fonctionnent sans souci avec `vue-chartjs`, comme décrit dans la [documentation chart.js](http://www.chartjs.org/docs/latest/developers/plugins.html) described.

Si vous désirez ajouter des plugins inline, `vue-chartjs` expose une méthode `addPlugin()`. L'appel à cette méthode doit se faire avant celui de `renderChart()`.

### Exemple

```javascript
mounted () {
  this.addPlugin({
    id: 'mon-plugin',
    beforeInit: function (chart) {
      ....
    }
  })
}
```

## Diagrammes disponibles

### Colonnes

<p class="tip">
  Il y a deux versions du diagramme colonnes : `{Bar}` et `{HorizontalBar}`
</p>

![Colonnes](../assets/bar.png)

### Ligne

![Ligne](../assets/line.png)

### Beignet

![Beignet](../assets/doughnut.png)

### Circulaire

![Circulaire](../assets/pie.png)

### Radar

![Radar](../assets/radar.png)

### Polaire

![Plaire](../assets/polar.png)

### Bulles

![Bulles](../assets/bubble.png)


### Nuages de points

Ce diagramme utilise une structure de données différente des autres. Pour le moment, les mixis de mise à jour de données ne fonctionnent pas avec ce type de graphique.

![Nuage de points](../assets/scatter.png)


## Explications sur les différents builds

Il y a trois builds différents. Le choix dépend de votre projet. Les dépendances sont soient intégrées, soit marquées comme peerDependency.

- Browser
- Browserify / Webpack 1
- Webpack 2


| Build | Chart.js | Vue.js |
|---|---|---|
| vue-chartjs.full.js | Intégré | Intégré |
| vue-chartjs.full.min.js |  Intégré | Intégré  |
| vue-chartjs.js | peerDependency | peerDependency  |
| vue-chartjs.min.js | peerDependency  | peerDependency  |
| es/index* |  peerDependency | peerDependency  |

### Browser

Vous pouvez utiliser `vue-chartjs` directement depuis votre navigateur sans aucun pré-requis. Comme par exemple sur ce [codepen](https://codepen.io/apertureless/pen/vxWbqB?editors=1010). Dans une telle situation, veuillez utiliser `vue-chartjs.full.min.js`, qui est la version compressée. Elle intègre Vue.js et Chart.js, et est bundlée à un module UMD. Donc ce fichier se suffit à lui-même.


### Browserify / Webpack 1

Si vous utilisez Gulp, Browserify ou Webpack 1, vous devrez prendre `vue-chartjs.js`, qui est __transpilé__ et __bundlé__ comme module UMD.

Toutefois, Vue.js et Chart.js sont des `peerDependencies`, vous devrez donc les installer séparemment. Dans la plupart des projets, `Vue.js` sera de toute façon déjà installé. De cette manière, vous pouvez utiliser des versions différentes de Vue.js et Chart.js dans un même package.

### Webpack 2

Si vous utilisez Webpack 2, `jsnext:main` / `module` sera automatiquement sélectionné. `es/index.js`est une version es __transpilée__ des sources, et n'est pas __bundlée__ à un module. Ainsi, rien ne devrait bloquer l'élimination de code mort.  Comme dans la version bundlée précédente, `Vue.js` et `Chart.js` sont des `peerDependencies` et doivent être installés.

## Ressources

Voici une liste de ressources et tutoriels sur comment utiliser `vue-chartjs` :

- [Using vue-chartjs with WordPress](https://medium.com/@apertureless/wordpress-vue-and-chart-js-6b61493e289f)
- [Create stunning Charts with Vue and Chart.js](https://hackernoon.com/creating-stunning-charts-with-vue-js-and-chart-js-28af584adc0a)
- [Let’s Build a Web App with Vue, Chart.js and an API Part I](https://hackernoon.com/lets-build-a-web-app-with-vue-chart-js-and-an-api-544eb81c4b44)
- [Let’s Build a Web App with Vue, Chart.js and an API Part II](https://hackernoon.com/lets-build-a-web-app-with-vue-chart-js-and-an-api-part-ii-39781b1d5acf)
- [Build a realtime chart with VueJS and Pusher](https://blog.pusher.com/build-realtime-chart-with-vuejs-pusher/)
