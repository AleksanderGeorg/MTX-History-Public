<template>
  <div id="priceHistory">
    <div>
      <h2>{{ getMTXName }}</h2>
    </div>
    <div id="links">
      <p>
        Look it up on the wiki <a :href="getWikiLink" target="_blank">here</a>
      </p>
    </div>
    <price-history :oldPrices="getPriceHistory" :oldDates="getDateHistory"></price-history>
  </div>
</template>

<script>
  import axios from 'axios';
  import PriceHistory from './Price/PriceHistory.vue';

  export default {
    components: {
      'price-history': PriceHistory,
    },

    computed: {
      getMTXName() {
        if(this.allData.mtxName)
          return this.allData.mtxName;
        else return 'undefined';
      },
      getPriceHistory() {
        if(this.allData.mtxPrice)
          return this.allData.mtxPrice;
        else return [];
      },
      getDateHistory() {
        if(this.allData.mtxDate)
          return this.allData.mtxDate;
        else return [];
      },
      getWikiLink() {
        if(this.allData.mtxName)
          return 'https://pathofexile.gamepedia.com/' + this.allData.mtxName.split(' ').join('_');
        else return 'https://pathofexile.gamepedia.com/Microtransaction';
      }
    },

    data() {
      return {
        allData: {}
      }
    },

    mounted(){
      var vm = this
      axios.get('https://mtxhistory-backend.herokuapp.com/historyMTX/'+this.$route.params.name)
        .then(data => {
          vm.allData = data.data[0]
        })
    }
  }
</script>

<style lang="scss" scoped>

</style>