const {createWriteStream} = require('fs')
const {sum, scale} = require('./operators/array')
const {activation} = require('./operators/function');
const {range} = require('lodash');
const {tensor1d, tensor2d} = require('@tensorflow/tfjs-node')
const {randomNormal} = require('@tensorflow/tfjs-node')
const {variable} = require('@tensorflow/tfjs-node')
const {add} = require('@tensorflow/tfjs-node');

const RunData = {
  run: {
    inputs: {},
    details: {
      Y_hat: [],
      Y: [],
      dLoss: [],
      dLoss_W: [],
      W: [],
    }
  }
}

const D = [2, 2, 1]
const X = tensor2d([[0, 0], [1, 0], [0, 1], [1, 1]])
const Y = tensor1d([0, 1, 1, 0])
const W = range(1, D.length).map((index) => variable(randomNormal([1, D[index]])))
const B = range(1, D.length).map((index) => variable(randomNormal([1, D[index]])))

W[0].print();
W[1].print();
B[0].print();
B[1].print();

const activation = (t) => t.sigmoid()

const forwardPass = (x, W, B) => {
  const Tx = tensor1d(x).reshape([1, 2])
  const L = [Tx]
  
  W.forEach((value, index) => {
    const Xi = L[index]
    const Wi = W[index]
    const Bi = B[index]

    // console.info('Li: ', index)
    // console.info(`Xi.shape: ${Xi.shape} Wi.shape: ${Wi.shape} Bi.shape: ${Bi.shape}`)
    // Xi.print()
    // Wi.print()
    // Bi.print()
    
    const WiT = Wi.transpose()

    // console.info(`WiT.shape: ${WiT.shape}`)
    // WiT.print()

    const Lwi = WiT.matMul(Xi).sum(1)

    // console.info(`Lwi.shape: ${Lwi.shape}`)
    // Lwi.print()

    const Li = add(Lwi.transpose(), Bi)

    // console.info(`Li.shape: ${Li.shape}`)
    // Li.print()

    L.push(activation(Li))
  })

  return L[L.length - 1]
}

const forwardProp = (X, Y, W, B) => {
  const Yvalue = Y.arraySync()
  const E = X
  .arraySync()
  .map((Xi, index) => {
    const Ti = forwardPass(Xi, W, B)
    const Yi = Yvalue[index]
    const Tivalue = Ti.arraySync()[0][0]
  
    return Math.pow(Tivalue - Yi, 2)
  })

  const Enorm = sum(E) / E.length
  return Enorm
}

const backProp = (X, Y, W, B) => {

}

const iteration = (X, Y, W, B) => {
  const Enorm = forwardProp(X, Y, W, B)
  backProp(X, Y, W, B)

  return Enorm
}

const Errors = range(5).map((_) => iteration(X, Y, W, B))

console.info(`Errors: `, Errors)

// const Yhat = (Xi, D, W, B) => {
//   const L = [[Xi]]

//   D.forEach((d, i) => {
//     console.info("Inputs: ", i, W[i], L[i])
//     Lw = math.dot(W[i], L[i])
//     L.push(math.add(Lw, B[i]))

//     console.info(L)
//   })

//   console.info(L)
// }

// const value = Yhat(X[0], D, W, B)
// console.info(value)


// // Predictions
// predictions = Data.Test.map(([x, y]) => {
//   const Z = x * W[2] + W[1];
//   const Phi = activation(Z)

//   return [x, y, Phi >= 0? 1: 0]
// })

// // Accuracy
// evaluations = predictions.map(([x, y, y_p], index) => {
//   comparison = Math.abs(y_p - y) === 0 ? 1: 0;

//   return [x, y, y_p, comparison];
// })

// console.info(evaluations);

// successes = evaluations.reduce((successes, [x, y, y_p, comparison]) => {
//   return successes += comparison;
// }, 0);

// accuracy = successes / evaluations.length;

// RunData.run.predictions = {
//   evaluations: evaluations,
//   accuracy: accuracy
// }

const stream = createWriteStream('./data/results.json');
stream.write(JSON.stringify(RunData));
