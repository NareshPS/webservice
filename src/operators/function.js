

activation = (x, type = 'tanh') => {
  switch (type) {
    case 'tanh':
      return Math.tanh(x)
    default:
      throw `Invalid type: ${type}`
  }
}

exports.activation = activation