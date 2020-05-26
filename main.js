const {createWriteStream} = require('fs');
const {sum, scale} = require('./src/operators/array');

const RunData = {
  run: {
    inputs: {},
    details: {
      y: [],
      Y: [],
      W: [],
      dy: [],
      dW: [],
    }
  }
}

const e = 0.000000000001

const generate = (size) => {
  return Array(size).fill(0).map((number) => {
    const x = (Math.random() >= 0.5? 1 + e: e)
    const y = (x + 1) % 2;

    return [x, y]
  })
}

Data = {
  Train: generate(100),
  Test: generate(20),
}

W = Math.random()

x_s = Data.Train.map(([x, y]) => x)
y_s = Data.Train.map(([x, y]) => y)

console.info("y, Y, dy, dW, W");

const iterations = 20;

Array(iterations).fill(0).forEach(() => {
  y = sum(scale(W, x_s))
  Y = sum(y_s)
  dy = Y - y
  dW = dy / Data.Train.length

  console.info(y, Y, dy, dW, W);

  RunData.run.details.y.push(y)
  RunData.run.details.Y.push(Y)
  RunData.run.details.dy.push(dy)
  RunData.run.details.dW.push(dW)
  RunData.run.details.W.push(W)

  W = W + dW
})

RunData.run.inputs = {
  x: x_s,
  y: y_s
}

console.info(Data.Test)

// Predictions
predictions = Data.Test.map(([x, y]) => [x, x * W >= 0.5? 1 + e: e])

//predictions.map(console.info);
console.info(predictions);


// Accuracy
evaluations = predictions.map(([x, y], index) => {
  comparison = y == Data.Test[index][1]? 1: 0;

  return [x, y, comparison];
})

successes = evaluations.reduce((successes, [x, y, comparison]) => {
  return successes += comparison;
}, 0);

accuracy = successes / evaluations.length;

RunData.run.predictions = {
  x: predictions.map(([x, y]) => x),
  y: predictions.map(([x, y]) => y),
  evaluation: evaluations.map(([x, y, comparison]) => comparison),
  accuracy: accuracy
}

const stream = createWriteStream('./data/results.json');
stream.write(JSON.stringify(RunData));
