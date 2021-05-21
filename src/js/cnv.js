let cnv
let ctx
let gc = [179, 113]
let rects = []
let meteors = []
function setup () {
  cnv = createCanvas(windowWidth, windowHeight)
  cnv.addClass('abs z-bottom')
  cnv.parent('bg-main')
  ctx = cnv.drawingContext
  rectMode(CENTER)
  for (let i = 0; i < 1; i++) {
    meteors.push(meteor({
      x: int(random(width * 0.25, width * 2)),
      y: -int(random(0, 100)),
      dx: -random(5, 15),
      dy: random(1, 5)
      // dx: -int(random(0, 10)),
      // dy: int(random(0, 5))
    }))
  }
}
function draw () {
  linearGradent()
  noStroke()

  meteors.forEach(_ => _())
}

function linearGradent () {
  let gradient = ctx.createLinearGradient(0, 0, width, height)
  let h = int(frameCount / 20) % 360
  gradient.addColorStop(0, `hsla(${h + gc[0]},34.2%,47.6%,0.3)`)
  gradient.addColorStop(1, `hsla(${h + gc[1]},48.2%,61.4%,0.3)`)
  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, width, height)
}

function meteor (config) {
  let { x, y, dx, dy } = config
  console.log(x, y, dx, dy)
  let gravity = 0.02
  let starPath = '7.5,0 8.2,5.7 12.8,2.2 9.3,6.8 15,7.5 9.3,8.2 12.8,12.8 8.2,9.3 7.5,15 6.8,9.3 2.2,12.8 5.7,8.2 0,7.5 5.7,6.8 2.2,2.2 6.8,5.7'
  let center = 7.5
  return () => {
    let theta = frameCount / 100
    dy += gravity
    x += dx
    y += dy

    transform(() => {
      translate(x, y)
      applyMatrix(cos(theta), sin(theta), -sin(theta), cos(theta), center, center)

      translate(-center, -center)
      fill('rgba(255,255,255,0.3)')
      shape(() => {
        starPath.split(' ').forEach(point => {
          let vtx = point.split(',').map(p => +p)
          vertex(vtx[0], vtx[1])
        })
      }, CLOSE)
    })

    if (y > height || x < 0) {
      x = int(random(width * 0.5, width * 2))
      y = -int(random(0, 100))
      dx = -random(5, 15)// -int(random(0, 10))
      dy = random(1, 5)// int(random(0, 5))
    }
  }
}
function transform (trans) {
  push()
  trans()
  pop()
}
function shape (vtx, toClose) {
  beginShape()
  vtx()
  endShape(toClose)
}

function windowResized () {
  resizeCanvas(windowWidth, windowHeight)
}
