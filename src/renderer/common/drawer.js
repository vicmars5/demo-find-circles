
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
    const imgd = this.ctx.createImageData(3, 3)
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
    let maxX = null
    let minX = null
    let maxY = null
    let minY = null

    for (let y = 0; y < this.height; y++) {
      let found = false
      for (let x = 0; x < this.width; x++) {
        const i = this.getPos(x, y)
        if (imgd.data[i] !== 255 && imgd.data[i + 3] !== 254) {
          found = true
          imgd.data[i + 3] = 254
          if (maxX === null || x > maxX) {
            maxX = x
          }
          if (minX === null || x < minX) {
            minX = x
          }
          if (maxY === null || y > maxY) {
            maxY = y
          }
          if (minY === null || y < minY) {
            minY = y
          }
          /*
          console.log({
            data: imgd.data,
            i,
            x,
            y
          })
          */
        } else {
          if (found) {
            break
          }
        }
      }
    }

    if (minX === null) {
      return null
    }

    return {
      limits: {
        minX,
        minY,
        maxX,
        maxY
      },
      center: {
        x: minX + (maxX - minX) / 2, // Center x
        y: minY + (maxY - minY) / 2 // Center y
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
