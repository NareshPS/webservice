const {ResultChart} = require('./result.chart');
const {range} = require('lodash');

const canvas = document.getElementById('canvas');
const Data = fetch('/data/results.json').then(res => res.json());
const LineLength = 10;

Data
.then((results) => {
  console.log(results);

  const chart = new ResultChart(canvas);
  const data = lineData(results.run.details.W[results.run.details.W.length - 1])

  console.info(data);
  chart.apply(data);
})

lineData = ([slope, offset]) => {
  const data = range(LineLength).map((value) => {
    const x = Math.random() * 10;
    const y = slope * x + offset;

    return [x, y]
  }).sort((a, b) => a[0] > b[0]? 1: -1)

  return data;
}