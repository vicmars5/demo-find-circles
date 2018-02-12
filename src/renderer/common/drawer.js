
const VISITED = 120
const BACKGROUND = 255
class Drawer {
  /**
   *
   * @param {canvas context} ctx
   */
  constructor (ctx, width, height) {
    this.ctx = ctx
    this.width = width
    this.height = height
  }

  /**
   * @param {object} pos
   * @param {number} pos.x
   * @param {number} pos.y
   * @param {object} color
   * @param {number} color.r - 0 - 255
   * @param {number} color.g - 0 - 255
   * @param {number} color.b - 0 - 255
   * @param {number} color.a - 0 - 255
   */
  drawPoint (pos, color) {
    const imgd = this.ctx.createImageData(1, 1)
    for (let i = 0; i < imgd.data.length; i += 4) {
      imgd.data[i] = color.r
      imgd.data[i + 1] = color.g
      imgd.data[i + 2] = color.b
      imgd.data[i + 3] = color.a
    }
    this.ctx.putImageData(imgd, pos.x, pos.y)
  }

  /**
   * @param {number} background - 0-255
   */
  findCircle (background, imgd) {
    // const imgd = this.ctx.getImageData(0, 0, this.width, this.height)
    let circles = []

    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        const i = this.getPos(x, y)
        if (imgd.data[i] !== BACKGROUND && imgd.data[i + 3] !== VISITED) {
          imgd.data[i + 3] = VISITED
          const circle = this.mapCircle(imgd.data, x, y)
          circles.push(circle)
        }
      }
    }
    return circles
  }

  /**
   *
   */
  mapCircle (data, x, y) {
    let i
    let px = x
    let py = y
    let minY = y
    let maxY = y
    let minX = x
    let maxX = x

    do {
      i = this.getPos(px, py)

      if (data[i] === BACKGROUND || py >= this.height) {
        break
      }
      data[i + 3] = VISITED
      maxY = py

      let npx = px // negaitve position x
      let ppx = px // positive position x
      // go right
      do {
        ppx++
        i = this.getPos(ppx, py)
        if (data[i] === BACKGROUND || ppx >= this.width) {
          break
        }
        data[i + 3] = VISITED// mark as visited
        if (ppx > maxX) {
          maxX = ppx
        }
      } while (true)

      // go left
      do {
        npx--
        i = this.getPos(npx, py)
        if (data[i] === BACKGROUND || npx < 0) {
          break
        }
        data[i + 3] = VISITED // mark as visited
        if (npx < minX) {
          minX = npx
        }
      } while (true)

      px = Math.round(minX + (maxX - minX) / 2) // corrige centro
      py++
    } while (true)

    return {
      limits: {
        minX,
        maxX,
        minY,
        maxY
      },
      center: {
        x: Math.round(minX + (maxX - minX) / 2), // corrige centro
        y: Math.round(minY + (maxY - minY) / 2)
      }
    }
  }
  /**
   * data array
   */
  getPos (x, y) {
    return (y * this.width + x) * 4
  }
}

export default Drawer
