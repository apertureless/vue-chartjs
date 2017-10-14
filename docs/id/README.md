---
search: id
---

# vue-chartjs
**vue-chartjs** adalah  wrapper [Chart.js](https://github.com/chartjs/Chart.js) dalam vue. Kamu dapat dengan mudah membuat komponen chart reusable.

## Pengenalan
`vue-chartjs` memungkinkan kamu untuk menggunakan chart.js tanpa usaha lebih didalam vue. Sempurna untuk orang-orang yang membutuhkan bagan/chart simpel dengan cepat.

Flexibel karena langsung menampilkan objek chart.js.


## Instalasi
Jika kamu menggunakan Vue.js 2+:

`yarn add vue-chartjs chart.js`

Jika menggunakan vue 1.x gunakan tag `legacy`. versi vue 1 sudah tidak diurus lagi.

`yarn add vue-chartjs@legacy`

## Mulai Cepat

Kamu perlu untuk meng-import base chart dan meng-extend-nya. Dengan cara ini akan lebih fleksibel ketika bekerja dengan data yang berbeda.
Kamu dapat melakukan enkapsulasi komponen-komponen dan menggunakan props untuk menyampaikan data atau bisa juga dengan menginputkan langsung didalam komponen. Namun komponenmu tidak reuseable.

Kamu bisa meng-import seluruh package atau modul-modul terpisah.

```javascript
// CommitChart.js
import { Bar } from 'vue-chartjs'

export default {
  extends: Bar,
  mounted () {
    // Overwriting base render method with actual data.
    this.renderChart(data, options)
  }
}
```

Kamu dapat melewatkan dua argumen pada `renderChart()`:

- Objek Data
- Objek Opsi

### Data object

Objek data:

```javascript
{
  labels: ['January', 'February'],
  datasets: [
    {
      label: 'GitHub Commits',
      backgroundColor: '#f87979',
      data: [40, 20]
    }
  ]
}
```

Untuk keterangan lebih lanjut dapat dilihat di dokumentasi [Chart.js](http://www.chartjs.org/docs/#chart-configuration-chart-data).

## Props

Terdapat beberapa props standar yang didefinisikan didalam BaseChart. Karena menggunakan `extend()`, props-props tersebut *tidak terlihat*, Namun kamu tetap bisa menulis ulang:

| Prop | Description |
|---|---|
| width | lebar chart |
| height | tinggi chart |
| chart-id | id canvas |
| css-classes | String dengan kelas css mengelilingi div |
| styles | Objek dengan style css mengelilingi div |

## Contoh

Berikut adalah beberapa contoh penggunaan

### Chart dengan props

Kamu dapat membuat props data dan opsi untuk melewatkan data pada chart.

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

Setelah kamu menambahkannya kamu dapat menggunakannya seperti biasa:

```html
 <line-chart :data="{your data object}" :options="{your options}"></line-chart>
```

Jika kamu ingin mengatur tinggi dan lebar:

```html
 <line-chart
  :data="{your data object}"
  :options="{responsive: false, maintainAspectRatio: false}"
  :width="400"
  :height="200"
  >
 </line-chart>
```

<p class="warning">
  Perlu diingat, kamu perlu untuk mengatur `responsive: false` agaar dapat mengatur `width` dan `height`.
</p>

### Chart dengan data lokal

```javascript
import {Bar} from 'vue-chartjs'

export default {
  extends: Bar,
  data () {
    return {
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
    }
  },
  mounted () {
    this.renderChart(this.datacollection, {responsive: true, maintainAspectRatio: false})
  }
}
```

### Reusable Komponen

Jika kamu ingin agar komponen chart reusable, cara paling baik adalah dengan menambahkan sebuah wrapper. Dengan cara ini komponen chart hanya bertanggung jawab dalam representasi data dan wrapper komponen bertanggung jawab dengan logika didalamnya. Banyak kasus-kasus yang berbeda dan juga berbeda jika kamu menjalankan Single Page Application atau mengintegrasikannya pada contoh laravel.

## Reactive Data

Chart.js tidak menyediakan live update jika kamu mengubah datasets. Akan tetapi `vue-chartjs` menyediakan 2 mixins untuk melakukannya.

- `reactiveProp`
- `reactiveData`

Kedua mixins tersebut sebenarnya sama. `reactiveProp` akan sering digunakan. `reactiveProp` meng-extend logika dari komponen chart dan secara otomatis membuat props `chartData` dan menambahkan `vue watch` dalam props ini. Pada saat data berubah, itu akan memanggil `update()` jika data memiliki datasets atau `renderChart()` jika datasets telah ada sebelumnya.

`reactiveData` secara sederhana membuat variabel lokal chartData dimana itu bukan sebuah props! dan watcher. Hal ini bisa berguna, jika kamu membutuhkan chart tertentu dan melakukan akses API didalam komponen chart.

```javascript
data () {
  return {
    chartData: null
  }
}
```

### Contoh

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

<p class="warning">
  ⚠ Perhatian: jika kamu memutasi data didalam komponen parent dan melewatkannya pada child komponen chart perlu diingat batasan javascript.
  Info lebih lanjut [issue#44](https://github.com/apertureless/vue-chartjs/issues/44)
</p>

### Batasan
  <ul>
    <li>[Caveats](https://vuejs.org/v2/guide/list.html#Caveats)</li>
    <li>[Change-Detection-Caveats](https://vuejs.org/v2/guide/reactivity.html#Change-Detection-Caveats)</li>
    <li>[vm.$watch](https://vuejs.org/v2/api/#vm-watch)</li>
  </ul>

## Objek Chart.js

Suatu ketika kamu membutuhkan kontrol chart.js. Kamu dapat mengaksesnya dengan `this.$data._chart`

## Inline plugins

Di Chart.js kamu dapat mendefinisikan plugin global dan inline. Plugin global bekerja tanpa masalah dengan `vue-chartjs` seperti yang dijelaskan pada [chart.js docs](http://www.chartjs.org/docs/latest/developers/plugins.html)

If you want to add inline plugins, `vue-chartjs` exposes a helper method called `addPlugin()`
You should call `addPlugin()` before the `renderChart()` method.
Jika kamu ingin menambahkan plugin inline, `vue-chartjs` menyediakan method helper `addPlugin()` kamu harus memanggil `addPlugin()` sebelum method `renderChart()`.

### Contoh

```javascript
mounted () {
  this.addPlugin({
    id: 'my-plugin',
    beforeInit: function (chart) {
      ....
    }
  })
}
```

## Charts yang Tersedia

### Bar Chart
<p class="tip">
  Terdapat dua versi bar chart. `{Bar}` dan `{HorizontalBar}`
</p>

![Bar](assets/bar.png)
### Line Chart

![Line](assets/line.png)

### Doughnut

![Doughnut](assets/doughnut.png)

### Pie

![Pie](assets/pie.png)

### Radar

![Pie](assets/radar.png)

### Polar Area

![Pie](assets/polar.png)

### Bubble

![Bubble](assets/bubble.png)

### Scatter

This chart has a different data structure then the others. Right now the reactive Mixins are not working for this chart type.
Chart ini memiliki struktur data yang berbeda dengan yang lainnya. Untuk sekarang reactive mixins tidak dapat bekerja pada tipe chart ini.

![Scatter](assets/scatter.png)


## Penjelasan Build
Terdapat tiga jenis titik entri. Tergantung setup mana yang kamu gunakan. Dependensi-dependensi telah di-bundle atau require sebagai peerDependency.

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

### Browser
Kamu dapat menggunakan `vue-chartjs` secara langsung didalam browser tanpa setup build. Seperti berikut [codepen](https://codepen.io/apertureless/pen/vxWbqB?editors=1010). Dalam kasus ini, mohon gunakan `vue-chartjs.full.min.js` yang telah di-minify. Didalamnya terdapat Vue.js dan Chart.js. Dan bundel modul UMD. Jadi kamu hanya membutuhkan satu file saja.


### Browserify / Webpack 1

Jika kamu menggunakan GUlp, Browserify atau Webpack 1 entri yang digunakan adalah `vue-chartjs.js` dimana telah di__transpile__ dan di__bundle__ UMD Module.

Bagaimanapun juga Vue.js dan Chart.js adalah `peerDependencies` jadi kamu harus meng-instalnya secara terpisah. Jika kamu telah memiliki `Vue.js` kamu dapat menggunakan versi Vue.js dan Chart.js yang terdapat di-package ini.

### Webpack 2
Jika kamu menggunakan Webpack 2 secara otomatis akan menggunakan titik entri `jsnext:main` / `module`. Di `es/index.js`
Di__transpile__ es sumber dari versi ini. Dan tidak di__bundle__ pada modul. Sehingga tree shaking akan bekerja. Sama seperti versi bundle, `Vue.js` dan `Chart.js` adalah `peerDependencies` dan butuh untuk diinstal.

## Sumber-sumber

Kamu dapat menemukan sumber-sumber seperti tutrial bagaimana cara untuk menggunakan `vue-chartjs`

- [Using vue-chartjs with WordPress](https://medium.com/@apertureless/wordpress-vue-and-chart-js-6b61493e289f)
- [Create stunning Charts with Vue and Chart.js](https://hackernoon.com/creating-stunning-charts-with-vue-js-and-chart-js-28af584adc0a)
- [Let’s Build a Web App with Vue, Chart.js and an API Part I](https://hackernoon.com/lets-build-a-web-app-with-vue-chart-js-and-an-api-544eb81c4b44)
- [Let’s Build a Web App with Vue, Chart.js and an API Part II](https://hackernoon.com/lets-build-a-web-app-with-vue-chart-js-and-an-api-part-ii-39781b1d5acf)
- [Build a realtime chart with VueJS and Pusher](https://blog.pusher.com/build-realtime-chart-with-vuejs-pusher/)
