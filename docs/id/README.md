---
search: id
---

# vue-chartjs
**vue-chartjs** adalah pembungkus [Chart.js](https://github.com/chartjs/Chart.js) dalam Vue. Anda dapat dengan mudah membuat komponen grafik yang dapat digunakan kembali.

## Pengantar
`vue-chartjs` memungkinkan Anda untuk dapat menggunakan Chart.js tanpa perlu bersusah-payah lagi dengan Vue. Hal ini sangat cocok bagi pengguna yang membutuhkan grafik sederhana dan mampu berfungsi dengan baik dalam waktu singkat.

Ia memisahkan logika dasarnya namun mengekspos obyek Chart.js untuk memberikan Anda fleksibilitas maksimal.

## Instalasi
Jika Anda menggunakan Vue.js 2+ jalankan perintah:

`yarn add vue-chartjs chart.js`

Jika Anda menggunakan vue 1.x gunakan tag `legacy`. Hal ini disebabkan karena Vue versi 1 sudah tidak dipelihara lagi.

`yarn add vue-chartjs@legacy`

## Petunjuk Praktis

Terlebih dahulu Anda perlu mengimpor grafik dasar kemudian mengembangkannya. Cara ini memberi keleluasaan saat bekerja dengan data yang berbeda.
Anda dapat merangkum beberapa komponen dan menggunakan props untuk mengirimkan data atau Anda bisa memasukkannya secara langsung kedalam komponen. Namun cara yang terakhir ini akan mengakibatkan komponen Anda tidak dapat digunakan lagi.

Anda dapat mengimpor seluruh paket secara keseluruhan atau setiap modul secara terpisah.

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

Anda dapat memberi dua argumen pada metode `renderChart()`:

- Obyek Data
- Obyek Pilihan

### Obyek data

Berikut ini adalah obyek data:

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

Keterangan lebih lengkap dapat dilihat pada dokumentasi [Chart.js](http://www.chartjs.org/docs/#chart-configuration-chart-data).

## Props

Terdapat beberapa props standar yang didefinisikan didalam grafik dasar. Karena menggunakan `extend()`,  sejumlah props tersebut *tidak terlihat*, namun tetap dapat ditulis ulang:

| Prop | Deskripsi |
|---|---|
| width | lebar grafik |
| height | tinggi grafik |
| chart-id | id canvas |
| css-classes | String dengan kelas css untuk surrounding div |
| styles | Obyek dengan style css untuk surrounding div container |

## Contoh

Berikut adalah beberapa contoh penggunaan

### Grafik dengan props

Anda dapat membuat props data dan opsi untuk mengirimkan data ke grafik.

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

Setelah menambahkan komponen Anda dapat menggunakannya seperti biasa:

```html
 <line-chart :data="chartData" :options="chartOptions"></line-chart>
```

Jika Anda ingin mengatur tinggi dan lebar:

```html
 <line-chart
  :data="chartData"
  :options="{responsive: false, maintainAspectRatio: false}"
  :width="400"
  :height="200"
  >
 </line-chart>
```

<p class="warning">
  Perlu diingat, Anda perlu untuk mengatur `responsive: false` agar dapat mengatur `width` dan `height`.
</p>

### Grafik dengan data lokal

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

### Komponen yang Dapat Digunakan Kembali

Jika Anda ingin menjaga agar komponen grafik Anda dapat digunakan kembali, cara yang terbaik adalah menambahkan pembungkus pada mereka. Dengan cara ini komponen grafik hanya bertanggung jawab untuk representasi data murni dan komponen pembungkus untuk logika di baliknya. Ada banyak kasus penggunaan yang berbeda dan akan berbeda jika Anda menjalankan single page application atau mengintegrasikannya dalam sebuah framework misalnya laravel.

## Data Reaktif

Chart.js tidak menyediakan live update jika Anda mengubah dataset. Akan tetapi `vue-chartjs` menyediakan 2 mixin untuk melakukannya.

- `reactiveProp`
- `reactiveData`

Kedua mixin tersebut sebenarnya sama. Namun `reactiveProp` akan lebih sering digunakan. `reactiveProp` memperluas logika dari komponen grafik dan secara otomatis membuat props `chartData` serta menambahkan `vue watch` dalam props ini. Pada saat data berubah, `update()` akan dipanggil jika data di dalam dataset telah berubah atau `renderChart()` jika dataset baru ditambahkan.

`reactiveData` secara sederhana membuat variabel lokal chartData dimana sebenarnya itu bukanlah sebuah props dan menambahkan watcher. Hal ini hanya berguna, jika Anda membutuhkan grafik tertentu dan melakukan akses API didalam komponen grafik.

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
  ⚠ Perhatian: Jika Anda memutasi data dalam komponen induk dan meneruskannya ke komponen grafik anak, perlu diingat batasan javascript.
  Info lebih lanjut [issue#44](https://github.com/apertureless/vue-chartjs/issues/44)
</p>

### Batasan
  <ul>
    <li>[Caveats](https://vuejs.org/v2/guide/list.html#Caveats)</li>
    <li>[Change-Detection-Caveats](https://vuejs.org/v2/guide/reactivity.html#Change-Detection-Caveats)</li>
    <li>[vm.$watch](https://vuejs.org/v2/api/#vm-watch)</li>
  </ul>

## Obyek Chart.js 

Suatu ketika Anda membutuhkan kontrol atas Chart.js. Anda dapat mengakses instance Chart.js dengan `this.$data._chart`.

## Plugin Inline

Dalam Chart.js Anda dapat mendefinisikan plugin global dan inline. Plugin global dapat bekerja tanpa masalah dengan `vue-chartjs` seperti yang dijelaskan pada [Chart.js docs](http://www.chartjs.org/docs/latest/developers/plugins.html).

Jika Anda ingin menambahkan plugin inline, `vue-chartjs` menyediakan method helper `addPlugin()`. Anda harus memanggil `addPlugin()` sebelum method `renderChart()`.

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
## Grafik Kustom/Baru

Kadang-kadang Anda perlu mengembangkan grafik Chart.js default. Terdapat banyak contoh cara mengembangkan dan mengubah grafik default. Atau Anda ingin membuat jenis grafik sendiri.

Dalam `vue-chartjs` Anda bisa melakukan hal ini dengan cara yang hampir sama.

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

## Grafik yang Tersedia

### Grafik Batang
<p class="tip">
  Terdapat dua versi grafik batang: `{Bar}` dan `{HorizontalBar}`
</p>

![Batang](assets/bar.png)
### Grafik Garis

![Garis](assets/line.png)

### Donat

![Donat](assets/doughnut.png)

### Pie

![Pie](assets/pie.png)

### Radar

![Radar](assets/radar.png)

### Polar Area

![Polar](assets/polar.png)

### Bubble

![Bubble](assets/bubble.png)

### Scatter

Grafik ini memiliki struktur data yang berbeda dengan yang lain. Untuk sekarang reactive mixins tidak dapat digunakan pada grafik tipe ini.

![Scatter](assets/scatter.png)

## Sumber acuan

Berikut ini adalah beberapa sumber acuan termasuk diantaranya tutorial cara menggunakan `vue-chartjs`

- [Using vue-chartjs with WordPress](https://medium.com/@apertureless/wordpress-vue-and-chart-js-6b61493e289f)
- [Create stunning Charts with Vue and Chart.js](https://hackernoon.com/creating-stunning-charts-with-vue-js-and-chart-js-28af584adc0a)
- [Let’s Build a Web App with Vue, Chart.js and an API Part I](https://hackernoon.com/lets-build-a-web-app-with-vue-chart-js-and-an-api-544eb81c4b44)
- [Let’s Build a Web App with Vue, Chart.js and an API Part II](https://hackernoon.com/lets-build-a-web-app-with-vue-chart-js-and-an-api-part-ii-39781b1d5acf)
- [Build a realtime chart with VueJS and Pusher](https://blog.pusher.com/build-realtime-chart-with-vuejs-pusher/)
