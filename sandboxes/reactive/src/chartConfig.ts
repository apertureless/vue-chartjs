function getRandomInt() {
  return Math.floor(Math.random() * (50 - 5 + 1)) + 5
}

export const randomData = () => ({
  labels: [
    'January' + getRandomInt(),
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ],
  datasets: [
    {
      label: 'Data One',
      backgroundColor: '#f87979',
      data: [
        getRandomInt(),
        getRandomInt(),
        getRandomInt(),
        getRandomInt(),
        getRandomInt(),
        getRandomInt(),
        getRandomInt(),
        getRandomInt(),
        getRandomInt(),
        getRandomInt(),
        getRandomInt(),
        getRandomInt()
      ]
    }
  ]
})

export const options = {
  responsive: true,
  maintainAspectRatio: false
}
