<template>
  <div id="mtxInfo">
    <h2 id="mtxName">{{ infoAll.infoName }}</h2>
    <p id="mtxType">{{ infoAll.infoType }}</p>
    <info-image id="mtxImage" :infoImage="infoAll.infoImage"></info-image>
    <info-text id="mtxText" :infoText="infoAll.infoText"></info-text>
    <div id="links">
      <p>
        Buy one from Path of Exile Store <a :href="getStoreLink" target="_blank">here</a>
      </p>
      <p>
        Look it up on the wiki <a :href="getWikiLink" target="_blank">here</a>
      </p>
    </div>
  </div>
</template>

<script>
  import InfoImage from './Image.vue';
  import InfoText from './Text.vue';

  export default {
    props: [
      'infoAll'
    ],

    components: {
      'info-image': InfoImage,
      'info-text': InfoText
    },

    computed: {
      getInfoAll () {
        return this.infoAll;
      },
      getStoreLink() {
        if(this.getInfoAll.infoName)
          return 'https://www.pathofexile.com/shop/category/daily-deals#microtransaction-' + this.getInfoAll.infoName.split(' ').join('');
        else return 'https://www.pathofexile.com/shop/category/daily-deals';
      },
      getWikiLink() {
        if(this.getInfoAll.infoName)
          return 'https://pathofexile.gamepedia.com/' + this.getInfoAll.infoName.split(' ').join('_');
         else return 'https://pathofexile.gamepedia.com/Microtransaction';
      }
    },

    data() {
      return {
        
      }
    }
  }
</script>

<style lang="scss" scoped>
  div {
    margin-left: 0px;
    margin-right: 0px;
  }

  #mtxImage {
    max-width: 125px;
    max-height: 125px;
    width: auto;
    height: auto;
  }

  #links {
    border-top: 1px solid;
    border-bottom: 1px solid;
  }
</style>