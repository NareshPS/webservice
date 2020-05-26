const {ResultChart} = require('./result.chart');

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const Data = fetch('/data/results.json').then(res => res.json());

Data
.then((results) => {
  console.log(results);

  const chart = new ResultChart(canvas);

  console.info(results.run.details.dy);
  
  chart.apply(results.run.details.dy);
})