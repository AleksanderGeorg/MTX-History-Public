<template>
  <a class="hotDeal" :href="getLink()">
    <p id="hotName">
      <strong>{{ getDeal.mtxName }}</strong>
    </p>
    <p id="hotPrice">
      {{ getDeal.CurrentPrice }} <span/>
    </p>
    <info-image id="mtxImage" :infoImage="getDeal.mtxImage"></info-image>
    <img id="noImage" v-if="getDeal.mtxImage=='noImage'" src="https://static.wikia.nocookie.net/pathofexile_gamepedia/images/9/97/Sale.png" />
  </a>
</template>

<script>
  import InfoImage from './Image.vue';

  export default {
    props: [
      'deal'
    ],

    components: {
      'info-image': InfoImage
    },

    methods: {
      getLink() {
        return '/'+this.deal.mtxName;
      }
    },

    computed: {
      getDeal() {
        if(this.deal)
          return this.deal;
        else return [];
      }
    },

    data() {
      return {
        mtxDeal: {}
      }
    }
  }
</script>

<style lang="scss" scoped>
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

  .hotDeal {
    background: #1b150a;
    border: 2px solid;
    border-radius: 4px;
    margin: 10px;
    width: 100%;
  }

  p {
    margin-left: 5px;
    margin-right: 5px;
    text-align: center;
  }

  #hotName {
    margin-bottom: 5px;
  }

  #hotPrice {
    margin-top: 0px;
  }

  #mtxImage {
    display: block;
    margin-left: auto;
    margin-right: auto;
    max-width: 95px;
    max-height: 95px;
    width: auto;
    height: auto;
    margin-bottom: 10px;
  }

  a {
    color: #dfcf99;
  }

  a:hover {
    color: #ebd9a1;
    background: #312e22;
  }

  #noImage {
    display: block;
    margin-left: auto;
    margin-right: auto;
    max-width: 95px;
    max-height: 95px;
    width: auto;
    height: auto;
    margin-bottom: 10px;
  }
</style>