
shallowEquals = (arr1, arr2) => arr1.length === arr2.length && arr1.every((value, index) => value === arr2[index]);
addArray = (dest, arr) => (arr.forEach((value, index) => dest[index] += value), dest);
subArray = (dest, arr) => (arr.forEach((value, index) => dest[index] -= value), dest);
scale = (factor, arr) => arr.map((x) => x * factor);
sum = (arr) => arr.reduce((y, x) => y += x, 0);

exports.shallowEquals = shallowEquals;
exports.addArray = addArray;
exports.subArray = subArray;
exports.add = addArray;
exports.sub = subArray;
exports.scale = scale;
exports.sum = sum;