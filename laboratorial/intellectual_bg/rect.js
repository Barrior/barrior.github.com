const randomColor = require('randomcolor')
const chroma = require('chroma-js')
const { createCanvas } = require('canvas')
const { times } = require('lodash')

function limitRandom (max, min) {
  return max === min ? max : (Math.random() * (max - min) + min)
}

const globalCompositeOperations = [
  'lighter', 'xor', 'copy'
]

const gcoLength = globalCompositeOperations.length - 1

function start () {
  const cw = 600
  const ch = 800

  const canvas = createCanvas(cw, ch)
  const ctx = canvas.getContext('2d')

  if (Math.random() > 0.25) {
    ctx.globalCompositeOperation = globalCompositeOperations[limitRandom(0, gcoLength)]
  }

  const halfW = cw * 0.5

  // bg
  const rc = randomColor({
    luminosity: 'light',
    count: 2,
    format: 'hex'
  })
  const gradient = ctx.createLinearGradient(0, 0, limitRandom(0, cw), ch)
  gradient.addColorStop(0, rc[0])
  gradient.addColorStop(1, rc[1])
  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, cw, ch)

  // rotate
  const angle = limitRandom(45, 0)
  ctx.rotate(angle * Math.PI / 180)

  times(limitRandom(20, 40), () => {
    let x = limitRandom(0, cw)
    let y = limitRandom(0, ch)
    const w = Math.random() > 0.65
      ? limitRandom(cw * 0.1, cw * 0.9)
      : limitRandom(cw * 0.1, cw * 0.5)
    let fillColor = randomColor({
      luminosity: 'blight',
      count: 1,
      format: 'hex'
    })[0]
    let alpha

    if (w > halfW) {
      alpha = limitRandom(0.1, 1 - w / cw)
    } else {
      alpha = limitRandom(0.1, 0.9)
    }

    if (Math.random() > 0.5) {
      const offsetX = limitRandom(0, cw - w)
      const offsetY = limitRandom(0, ch - w)
      x -= offsetX
      y -= offsetY
    }

    ctx.beginPath()
    ctx.rect(x, y, w, w)
    ctx.fillStyle = chroma(fillColor).alpha(alpha).css()
    ctx.fill()
  })

  return {
    buffer: canvas.toBuffer(),
    base64: canvas.toDataURL()
  }
}

exports.createRect = start
