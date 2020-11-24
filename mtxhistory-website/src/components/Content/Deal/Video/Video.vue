<template>
  <iframe id="mtxVideo" :src="mtxVideo" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"></iframe>
</template>

<script>
  export default {
    props: ['mtxVideo'],

    data() {
      return {
        
      }
    }
  }
</script>

<style lang="scss" scoped>
  iframe {
    width: 100%;
    height: 100%;
  }
</style>