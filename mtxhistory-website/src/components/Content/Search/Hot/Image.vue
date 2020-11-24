<template>
  <img v-if="isAvailable(infoImage)" :src="infoImage" />
</template>

<script>
  export default {
    props: [
      'infoImage'
    ],
    methods: {
      isAvailable(infoImage) {
        if(infoImage == 'noImage')
          return false;
        else
          return true;
      }
    },
  }
</script>

<style lang="scss" scoped>
  image {
    width: 100%;
    height: 100%;
  }
</style>