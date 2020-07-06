exports.limitRandom = (max, min) => {
  return max === min ? max : (Math.random() * (max - min) + min)
}
