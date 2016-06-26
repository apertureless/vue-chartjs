import BarChart from '../BaseCharts/Bar'

export default BarChart.extend({
  ready () {
    this.render({
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
        {
          label: 'Data One',
          backgroundColor: '#f87979',
          data: [40, 39, 10, 40, 39, 80, 40]
        },
        {
          label: 'Data Two',
          backgroundColor: '#f87979',
          data: [0, 0, 0, 39.30, 39.30, 39.30]
        }
      ]
    })
  }
})
