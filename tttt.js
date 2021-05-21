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
  for (let i = 0; i < int(width / 100); i++) {
    let iniW = int(random(20, 150))
    rects.push(rotateRect({
      w: iniW,
      px: int(random(-width / 2, width / 2)),
      py: iniW,
      f: int(random(100, 120)) * randomBool()
    }))

    meteors.push(meteor({
      px: int(random(300)),
      py: int(random(50))
    }))
  }
}
function draw () {
  linearGradent()
  noStroke()
  // fill('rgba(255,255,255,0.2)')
  // polygon('27.5,19.9 20.4,20.2 20.4,27.3 15.2,22.5 10.1,27.5 9.8,20.4 2.7,20.4 7.5,15.2 2.5,10.1 9.6,9.8 9.6,2.7 14.8,7.5 19.9,2.5 20.2,9.6 27.3,9.6 22.5,14.8', { cx: 15, cy: 15 })

  // rects.forEach(rect => {
  //   rect()
  // })
  meteors.forEach(m => {
    m()
  })
}

function linearGradent () {
  let gradient = ctx.createLinearGradient(0, 0, width, height)
  let h = int(frameCount / 20) % 360
  gradient.addColorStop(0, `hsl(${h + gc[0]},34.2%,47.6%)`)
  gradient.addColorStop(1, `hsl(${h + gc[1]},48.2%,61.4%)`)
  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, width, height)
}

function rotateRect (config) {
  let y = height
  let moveY = int(random(2, 5))
  let { px, py, w, f } = config
  return () => {
    y -= moveY
    push()
    translate(width / 2 + px, height / 2 + py + y)
    rotate(frameCount / f)
    fill('rgba(255,255,255,0.2)')
    noStroke()
    rect(0, 0, w, w)
    fill('black')
    pop()
    if (y < -height - py) {
      let iniW = int(random(10, 100))
      y = height
      moveY = int(random(1, 3))
      w = iniW
      px = int(random(-width / 2, width / 2))
      py = iniW
      f = int(random(100, 120)) * randomBool()
    }
    return config
  }
}

function meteor (config) {
  let { px, py } = config
  return () => {
    let theta = frameCount / 100
    push()
    translate(width + px - frameCount, -py + frameCount)
    ctx.fill(new Path2D('M11,29.6c-3.6-0.9-6-3.2-6.7-3.9c-0.8-0.8-3-3.1-3.9-6.7C-1,13.4,1.5,8.6,2,7.6C7.2-2.2,19.3,1.2,36.5-9.9c7.4-4.8,12-9.9,12.7-9.3c0.6,0.6-4.4,5.3-9.1,12.8c-11,17.4-7.8,29.5-17.6,34.4C21.4,28.5,16.6,31,11,29.6z'))

    applyMatrix(cos(theta), sin(theta), -sin(theta), cos(theta), 15, 15)
    translate(-15, -15)

    beginShape()
    points.split(' ').forEach(point => {
      let vtx = point.split(',').map(p => +p)
      vertex(vtx[0], vtx[1])
    })
    endShape(CLOSE)
    pop()

    return config
  }
}
function randomBool () {
  return round(random(0, 1)) === 0 ? -1 : 1
}
function windowResized () {
  resizeCanvas(windowWidth, windowHeight)
}
