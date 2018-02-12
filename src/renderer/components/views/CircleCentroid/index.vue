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
    <photo-card
      v-for="photo in photos"
      :file="photo"/>
  </div>
</template>

<script>
import Dropzone from '@/components/common/Dropzone'
import PhotoCard from './PhotoCard'

export default {
  data () {
    return {
      photos: []
    }
  },
  components: {
    Dropzone,
    PhotoCard
  },
  methods: {
    async onFilesDropped (files) {
      console.log('files ', files)
      files.forEach(file => this.photos.push(file))
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
