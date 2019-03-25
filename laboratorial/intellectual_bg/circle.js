const randomColor = require('randomcolor')
const { createCanvas } = require('canvas')

function limitRandom (max, min) {
  return max === min ? max : (Math.random() * (max - min) + min)
}

function start () {
  const cw = 600
  const ch = 800

  const canvas = createCanvas(cw, ch)
  const ctx = canvas.getContext('2d')

  let r = limitRandom(130, 40)
  let d = r * 2

  let xLen = Math.ceil(cw / d)
  let yLen = Math.ceil(ch / d)

  // bg
  const rc = randomColor({
    // hue: 'purple',
    luminosity: 'light',
    count: 2,
    format: 'hex'
  })
  const gradient = ctx.createLinearGradient(0, 0, limitRandom(0, cw), ch)
  gradient.addColorStop(0, rc[0])
  gradient.addColorStop(1, rc[1])
  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, cw, ch)

  let offsetX = limitRandom(-r, 0)
  let offsetY = limitRandom(-r, 0)

  // rotate
  const angle = limitRandom(45, 0)
  ctx.rotate(angle * Math.PI / 180)

  // dots space
  const space = limitRandom(r * 0.5, 0)

  const moreDots = 6

  for (let row = moreDots * -1; row < yLen; row++) {
    let y = row * d + r + space * row
    for (let col = 0; col < xLen + moreDots; col++) {
      let x = col * d + r + space * col
      ctx.beginPath()
      ctx.arc(x + offsetX, y + offsetY, r, 0, 360 * Math.PI / 180, true)
      ctx.fillStyle = randomColor({
        // hue: 'orange',
        luminosity: 'blight',
        count: 1,
        format: 'hex'
      })
      ctx.fill()
    }
  }

  return {
    buffer: canvas.toBuffer(),
    base64: canvas.toDataURL()
  }
}

exports.createCircle = start
