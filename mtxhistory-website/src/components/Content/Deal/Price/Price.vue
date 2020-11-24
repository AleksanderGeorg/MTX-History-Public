<template>
  <div id="mtxPriceData">
    <h2>Price summary</h2>
    <div id="dealAlert" v-if="checkForCurrentDeal(checkForLowestPrice(getPriceHistory), discountPrice.currentPrice)">
      <strong>Current price is the best deal yet!</strong>
    </div>
    <div id="currentPrice">
      <p>
      <strong>Current price:</strong> {{ discountPrice.currentPrice }} <span/>
      </p>
    </div>
    <div id="normalPrice">
      <p>
        <strong>Normal price:</strong> {{ discountPrice.normalPrice }} <span/>
      </p>
    </div>
    <div id="lowestPrice">
      <p>
        <strong>Lowest price:</strong> {{ checkForLowestPrice(getPriceHistory) }} <span/>
      </p>
    </div>
    <div id="priceHistory">
      <price-history :oldPrices="getPriceHistory" :oldDates="getDateHistory"></price-history>
    </div>
  </div>
</template>

<script>
  import PriceHistory from './PriceHistory.vue';

  export default {
      methods: {
        checkForLowestPrice(prices) {
          var lowestPrice = prices[0];
          for (var i = 0; i < prices.length; i++) {
            if (lowestPrice > prices[i])
              lowestPrice = prices[i];
          }
          return lowestPrice;
        },

        checkForCurrentDeal (lowestPrice, currentPrice) {
          if (currentPrice <= lowestPrice)
            return true;
          else
            return false;
        }
      },

    components: {
      'price-history': PriceHistory,
    },

    props: ['discountPrice', 'priceHistory', 'dateHistory'],

    data() {
      return {

      }
    },

    computed: {
      getPriceHistory() {
        if(this.priceHistory)
          return this.priceHistory;
        else return [];
      },
      getDateHistory() {
        if(this.dateHistory)
          return this.dateHistory;
        else return [];
      },
    }
  }
</script>

<style lang="scss" scoped>
  div {
    margin-left: 0px;
    margin-right: 0px;
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
  #dealAlert {
    color: #e06f18;
  }
</style>