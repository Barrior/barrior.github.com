module.exports = (duration = 1000) =>
  new Promise((resolve, reject) => {
    setTimeout(() => reject(new Error('timeout')), duration)
  })
