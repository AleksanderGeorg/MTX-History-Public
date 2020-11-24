<template>
  <div>
    <h2>Price history</h2>
    <ul id="allPricesList">
      <li v-for="(price, index) in getSortedPriceAndDateArray(getPriceAndDateArray(getOldPrices, getOldDates))" :key="index">
        <p>
          <strong>Sale {{ getOldDates.length - index }} - </strong>{{ price[0] }} - {{ price[1] }} <span/>
        </p>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    props: ['oldPrices', 'oldDates'],

    computed: {
      getOldPrices() {
        return this.oldPrices;
      },

      getOldDates() {
        return this.oldDates;
      }
    },

    methods: {
      getPriceAndDateArray(oldPrices, oldDates) {
        var priceAndDateArray = [];
        if(oldPrices.length > 0 && oldDates.length > 0) {
          for(var i = 0; i < oldPrices.length; i++) {
            priceAndDateArray[i] = [oldDates[i], oldPrices[i]];
          }
        }
        return priceAndDateArray;
      },
      getSortedPriceAndDateArray(priceAndDateArray) {
        const compareDates = function(date1, date2){
          var d1 = new Date(date1[0]);
          var d2 = new Date(date2[0]);
          if (d1<d2)
            return 1;
          else if (d1>d2)
            return -1;
          else
            return 0;
        }
        return priceAndDateArray.sort(compareDates);
      }
    },

    data() {
      return {
        
      }
    }
  }
</script>

<style lang="scss" scoped>
  ul {
    list-style: none;
    padding-left: 0;
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