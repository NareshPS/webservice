const {Chart} = require('chart.js');
const {range, head} = require('lodash');

ResultChart = class {
  constructor(canvas) {
    this._canvas = canvas;
    this._chart = new Chart(
      canvas.getContext('2d'),
      {
        type: 'line',

        data: {
          labels: [],
          datasets: [
            {
              label: 'dy plot',
              data: [],
              backgroundColor: 'rgba(0, 255, 0, 0.3)',
              borderColor: 'rgb(0, 255, 0)',
              borderWidth: 1
            }
          ]
        },

        options: {
          title: {
            display: true,
            position: 'bottom',
            text: '# of iterations'
          }
        }
      });
  }

  apply(data) {
    const chartData = this.toChartData(data);
    const dataId = 0;

    this.clear(dataId);
    this.add(dataId, chartData.labels, chartData.data);

    this._chart.update();

    // this._chart.data.labels = chartData.labels;
    // this._chart.data.datasets[0].data = chartData.data;
  }

  toChartData(data) {
    return typeof head(data) === 'number'?
    {
      labels: range(data.length),
      data: data
    }:
    {
      labels: data.map(([x, y]) => x),
      data: data.map(([x, y]) => y)
    }
  }

  clear(id) {
    this._chart.data.labels.pop();

    const nouse = 
    id?
    this._chart.data.datasets[id].data = []:
    this._chart.data.datasets.forEach((dataset) => dataset.data = []);
  }

  add(id, labels, data) {
    this._chart.data.labels = labels;
    this._chart.data.datasets[id].data = data;
  }
}


exports.ResultChart = ResultChart;