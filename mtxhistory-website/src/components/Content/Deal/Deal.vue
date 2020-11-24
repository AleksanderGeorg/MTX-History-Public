<template>
  <div class="deal-wrapper">
    <div class="video-wrapper" v-if="isAvailable(getData.mtxVideo)">
      <yt-video :mtxVideo="getData.mtxVideo"></yt-video>
    </div>
    <info :infoAll="getInfo"></info>
    <div id="backButton"><a href="/">Back to search</a></div>
    <price :discountPrice="getDiscountPrice" :priceHistory="getData.mtxPrice" :dateHistory="getData.mtxDate" ></price>
  </div>
</template>

<script>
  import axios from 'axios';

  import Video from './Video/Video.vue';
  import Info from './Info/Info.vue';
  import Price from './Price/Price.vue';

  export default {
    components: {
      'yt-video': Video,
      'info': Info,
      'price': Price
    },

    data() {
      return {
        mtxData: {required: true}
      }
    },

    computed: {
      getData() {
        return this.mtxData;
      },
      getInfo() {
        return {
          infoName: this.mtxData.mtxName,
          infoType: this.mtxData.mtxType,
          infoImage: this.mtxData.mtxImage,
          infoText: this.mtxData.mtxText
        }
      },
      getDiscountPrice() {
        return {
          currentPrice: this.mtxData.CurrentPrice,
          normalPrice: this.mtxData.NormalPrice
        }
      }
    },

    methods: {
      isAvailable(videoURL) {
        if(videoURL == 'https://www.youtube.com/embed/undefined')
          return false;
        else
          return true;
      }
    },

    mounted(){
      var vm = this
      axios.get('https://mtxhistory-backend.herokuapp.com/allMTXS/'+this.$route.params.name)
        .then(data => {
          vm.mtxData = data.data[0]
        })
    }
  }
</script>

<style lang="scss" scoped>
  .video-wrapper {
      width: 100%;
      height: 360px;
      max-width: 640px;
      max-height: calc((100vw - 40px) / (16/9));
      display: block;
      margin-left: auto;
      margin-right: auto;
  }

  p {
    text-align: center;
  }

  #backButton {
    margin-top: 10px;
    margin-bottom: 10px;
    margin-left: 0px;
  }
</style>