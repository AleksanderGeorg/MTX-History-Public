<template>
  <div>
    <a :href="getLink()">
      <strong>{{ mtxData.mtxName }}</strong>{{ this.getCurrentPrice }} <span v-if="this.getCurrentPrice"/>
    </a>
  </div>
</template>

<script>
  

  export default {
    props: [
      'mtxData'
    ],

    data() {
      return {
        
      }
    },

    computed: {
      getCurrentPrice() {
        if(this.mtxData.CurrentPrice)
          return ' - ' + this.mtxData.CurrentPrice;
        else
          return '';
      }
    },

    methods: {
      getLink() {
        if(this.mtxData.CurrentPrice)
          return '/'+this.mtxData.mtxName;
        else return '/historyMTX/'+this.mtxData.mtxName;
      }
    }
  }
</script>

<style lang="scss" scoped>
  div {
    margin: 10px;
  }

  a {
    font-size: large;
    text-decoration: none;
    color: #a38d6d;
  }

  a:hover {
    color: #dfcf99;
  }

  span {
    background: url('https://www.pathofexile.com/image/gen/ui-sprite.png?1602566757488') no-repeat;
    background-position: -32px -141px;
    width: 16px;
    height: 16px;
    display: inline-block;
    vertical-align: middle;
    left: -1px;
    top: -1px;
    position: relative;
  }
</style>