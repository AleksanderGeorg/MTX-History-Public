<template>
  <div>
    <menu-items :menuItemsProp="menuItemsProp"></menu-items>
  </div>
</template>

<script>
  import MenuItems from './MenuItems.vue';

  export default {

    components: {
      'menu-items': MenuItems
    },

    data() {
      return {
        menuItemsProp: [
          {name: 'Home', pagelink: '/home'},
          {name: 'Search', pagelink: '/search'},
          {name: 'About', pagelink: '/about'},
          {name: 'Data', pagelink: '/data'}
        ]
      }
    }
  }
</script>

<style lang="scss" scoped>
  
  div {
    text-align: center;
    list-style-type: none;
  }
</style>