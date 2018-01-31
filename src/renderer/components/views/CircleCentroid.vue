<template>
  <div class="container">
    <h1> Encontrar centroide de circulo </h1>
    <dropzone
      class="card"
      v-on:files-dropped="onFilesDropped">
      <h2>Drop your files here</h2>
      <p class="files-icon">
        <i class="fa fa-file-image-o" aria-hidden="true"></i>
      </p>
    </dropzone>
    <div
      v-for="file in files"
      class="card card-dark">
      <div class="card-body">
        Name: {{ file.original.name }}
      </div>
    </div>
  </div>
</template>

<script>
import Dropzone from '@/components/common/Dropzone'

export default {
  data () {
    return {
      files: []
    }
  },
  components: {
    Dropzone
  },
  methods: {
    onFilesDropped (files) {
      console.log('files ', files)
      files.forEach((file) => {
        this.files.push({
          original: file
        })
      })
    }
  }
}
</script>

<style lang="sass" scoped>
.files-icon
  font-size: 50px
.card
  margin-bottom: 20px
</style>
