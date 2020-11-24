<template>
  <div>
    <ul>
      <li v-for="menuItem in menuItemsProp" :key="menuItem.name">
        <router-link :to="menuItem.pagelink">{{ menuItem.name }}</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    props: ['menuItemsProp'],

    data() {
      return {

      }
    }
  }
</script>

<style lang="scss" scoped>
  li {
    font-size: 1.3em;
    font-weight: bold;
    margin-left: 1.5em;
    margin-right: 1.5em;
    text-decoration: none;
    display: inline-block;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  ul {
    padding-left: 0px;
  }
</style>