<template>
  <div class="card card-dark">
    <div class="card-body">
      <p>
        Name: <b>{{ file.name }}</b>
      </p>
      <p>
        <button
          v-on:click="process"
          class="btn btn-primary">
          <i
            :class="{ 'rotation-permanent': processing }"
            class="fa fa-spinner" aria-hidden="true"></i>
          Proccess
        </button>
      </p>
      <p>
        <img 
         class="img-fluid"
         ref="img"
         :width="width"
         :src="url" />
      </p>
      <p>
        <canvas style="width:100%" ref="imgCanvas">
        </canvas>
      </p>
      <p>
      <b>width</b> {{ width }}, <b>height</b> {{ height }}
      </p>
      <pre><code>const circles = {{
        JSON.stringify(circles.map(circle => circle.center), null, 2)
      }}</code></pre>
    </div>
  </div>
</template>

<script>
import PromiseFileReader from 'promise-file-reader'
import Drawer from '@/common/drawer'

export default {
  props: ['file'],
  data () {
    return {
      url: null,
      width: null,
      height: null,
      canvasDrawed: false,
      drawer: null,
      processing: false,
      circles: []
    }
  },
  watchers: {
    width (val) {
    }
  },
  methods: {
    async readPhoto (photo) {
      const url = await PromiseFileReader.readAsDataURL(photo)
      this.url = url
    },
    process (photo) {
      this.processing = true
      this.createImgCanvas()
    },
    onResize () {
      console.log('new size')
    },
    createImgCanvas () {
      const width = this.$refs.img.width
      const height = this.$refs.img.height

      this.$refs.imgCanvas.width = width
      this.$refs.imgCanvas.height = height

      this.width = width
      this.height = height

      const ctx = this.$refs.imgCanvas.getContext('2d')
      ctx.drawImage(this.$refs.img, 0, 0, width, height)
      this.drawer = new Drawer(ctx, width, height)

      const imgd = ctx.getImageData(0, 0, width, height)
      const circles = this.drawer.findCircle(imgd)
      circles.forEach((circle) => {
        this.drawer.drawPoint(circle.center, {
          r: 255,
          g: 0,
          b: 0,
          a: 255
        })
      })
      this.circles = circles
      this.processing = false
    }
  },
  async created () {
    if (this.file) {
      await this.readPhoto(this.file)
    }
  },
  updated () {
  }
}
</script>

<style lang="sass" scoped>
</style>
