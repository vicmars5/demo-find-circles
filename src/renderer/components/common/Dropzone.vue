<template>
  <div 
    class="card-dropzone text-center"
    :class="{ dragging }"
    v-on:dragover.prevent="onDragOver"
    v-on:dragleave.prevent="onDragLeave"
    v-on:drop.prevent="onDrop">
    <slot></slot>
  </div>
</template>

<script>
export default {
  data () {
    return {
      dragging: false
    }
  },
  methods: {
    onDragOver () {
      this.dragging = true
    },
    onDragLeave () {
      this.dragging = false
    },
    onDrop (dragEvent) {
      this.dragging = false
      if (!dragEvent.dataTransfer.files) {
        return
      }
      const files = dragEvent.dataTransfer.files
      let fileArray = []
      for (let i = 0; i < files.length; i++) {
        fileArray.push(files[i])
      }
      this.$emit('files-dropped', fileArray)
    }
  }
}
</script>

<style lang="sass" scoped>
</style>
