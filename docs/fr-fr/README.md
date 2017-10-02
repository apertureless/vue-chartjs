<div align="center">
  <img width="256" heigth="256" src="../assets/vue-chartjs.png" alt="vue-chartjs logo">
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

**vue-chartjs** est un wrapper vue pour [Chart.js](https://github.com/chartjs/Chart.js). Vous pouvez facilement créer des composants graphiques réutilisables.

## Demo & Docs

- 📺 [Demo](http://demo.vue-chartjs.org/)
- 📖 [Docs](http://www.vue-chartjs.org/)

### Compatibilité

- v1 later `@legacy`
  - Vue.js 1.x
- v2 later
  - Vue.js 2.x

Après la sortie de la version finale de vue.js 2, vous obtiendrez la version 2 par défaut lorsque vous installerez vue-chartjs avec npm.
Plus besoin du marqueur @next désormais. Si vous souhaitez la v1, vous devrez indiquer explicitement la version, ou utiliser le marqieur legacy.
Si vous cherchez la v1, rendez-vous sur cette [branche](https://github.com/apertureless/vue-chartjs/tree/release/1.x).

## Installation

Lancez simplement la commande `yarn add vue-chartjs chart.js`

Ou si vous souhaitez l'utiliser directement dans votre navigateur, ajoutez

```html
<script src="https://unpkg.com/vue-chartjs/dist/vue-chartjs.full.min.js"></script>
```
à vos scripts. Voir sur [Codepen](https://codepen.io/apertureless/pen/vxWbqB?editors=1010)

## Explication sur les différents builds

Il y a trois builds différents. Tout dépend 
There are three different entry points. Tout dépend de la configuration que vous utilisez. Les dépendances sont soit intégrées au build, soit requises en tant que peerDependency :

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

Toutefois, Vue.js et Chart.js sont des `peerDependencies`, vous devrez donc les installer séparemment. Dans la plupart des projets, `Vue.js` sera de toute façon déjà installé. De cette manière, vous pouvez utiliserdes versions différentes de Vue.js et Chart.js dans un même package.

### Webpack 2

Si vous utilisez Webpack 2, `jsnext:main` / `module` sera automatiquement sélectionné. `es/index.js`est une version es __transpilée__ des sources, et n'est pas __bundlée__ à un module. Ainsi, rien ne devrait bloquer l'élimination de code mort.  Comme dans la version bundlée précédente, `Vue.js` et `Chart.js` sont des `peerDependencies` et doivent être installés.


## Comment faire

Vous devez importer l'objet graphe de base et l'étendre. Cette opération permet d'offrir beaucoup plus de flexibilité lorsque plusieurs sources de données sont utilisées. Vous pouvez passer les données via props ou vue-resource.

Vous pouvez choisir d'importer le package dans son intégralité, ou chaque composant individuellement.

```javascript
import VueCharts from 'vue-chartjs'
import { Bar, Line } from 'vue-chartjs'
```

Créez simplement votre composant.

```javascript
// GraphiqueCommits.js
import { Bar } from 'vue-chartjs'

export default Bar.extend({
  mounted () {
    // Surcharge de la méthode render avec les données.
    this.renderChart({
      labels: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'],
      datasets: [
        {
          label: 'Commits GitHub',
          backgroundColor: '#f87979',
          data: [40, 20, 12, 39, 10, 40, 39, 80, 40, 20, 12, 11]
        }
      ]
    })
  }
})
```

Il ne vous reste qu'à importer et utiliser votre propre composant comme un composant vue classique.

```javascript
import GraphiqueCommits from 'chemin/vers/composant/GraphiqueCommits'
```

## Autre exemple avec options

Vous pouvez surcharger les options par défaut du graphique. Indiquez simplement un objet options en tant que second paramètre de la méthode render.

```javascript
// RevenuMensuel.js
import { Line } from 'vue-chartjs'

export default Line.extend({
  props: ['data', 'options'],
  mounted () {
    this.renderChart(this.data, this.options)
  }
})
```

Utilisez-le dans votre application Vue :

```javascript
import RevenuMensuel from 'chemin/vers/composant/RevenuMensuel'

<template>
  <revenu-mensuel :data={....} />
</template>

<script>
export default {
  components: { RevenuMensuel },
  ....
}
</script>
```

## Mises à jour des données

Chart.js ne donne pas de mécanisme de mise à jour automatique si jamais vous deviez modifier vos jeux de données. Vous pouvez cependant implémenter le mécanisme facilement à l'aide de l'un de deux mixins inclus :

- `reactiveProp`
- `reactiveData`

Tous deux sont inclus dans le module `mixins`.

Ces mixins crée automatiquement `chartData` en tant que prop ou donnée, ainsi qu'un watcher. Si la donnée est modifiée, le graphique sera actualisé.
Veuillez cependant garder à l'esprit les limitations de vue et de javascript sur les propriétés de mutabilité des tableaux et objets. Plus d'infos [ici](http://vue-chartjs.org/#/home?id=reactive-data).

```javascript
// RevenuMensuel.js
import { Line, mixins } from 'vue-chartjs'

export default Line.extend({
  mixins: [mixins.reactiveProp],
  props: ['chartData', 'options'],
  mounted () {
    this.renderChart(this.chartData, this.options)
  }
})

```

### Module Mixins
Le module `mixins` est inclu dans le module`VueCharts` et tant que module séparé.
Différentes manières de les importer :

```javascript
// Importe le module en entier avec tous les diagrammes
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
// Importe les modules individuellement
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
// Importe les modules individuellement, avec assignation
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

## Diagrammes disponibles

### Colonnes

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

![Nuage de points](../assets/scatter.png)

## Installation

``` bash
# installation des dépendances
npm install

# sert sur localhost:8080 avec rechargement auto
npm run dev

# build production avec compression
npm run build

# exécution des tests unitaires
npm run unit

# exécution des tests e2e
npm run e2e

# exécution de tous les tests
npm test
```

Pour une explication détaillée du fonctionnement, vous pouvez lire le [guide](http://vuejs-templates.github.io/webpack/) ainsi que la [documentation pour vue-loader](http://vuejs.github.io/vue-loader).

## Contribution

1. Forkez ( https://github.com/apertureless/vue-chartjs/fork )
2. Créez la branche pour votre fonctionnalité (`git checkout -b my-new-feature`)
3. Commitez vos modifications (`git commit -am 'Add some feature'`)
4. Pushez sur la branche (`git push origin my-new-feature`)
5. Créez une nouvelle Pull Request

## Licence

Ce logiciel est distribué sous [licence MIT](LICENSE.txt).
