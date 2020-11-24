<template>
  <div id="app">
    <div class="asider">
      <div class="adDiv">
        <p id="patreonText">
          <a id="patreonLink" href="https://patreon.com/mtxhistory" target="_blank"><strong>Vote for features on Patreon!</strong></a>
        </p>
      </div>
      <iframe src="https://rcm-eu.amazon-adsystem.com/e/cm?o=2&p=42&l=ur1&category=amazon_student&banner=0J4KQS4Z1HXSVRFFT382&f=ifr&linkID=2125f66a2ee3ed434c442308ed2baabc&t=mtxhistory-21&tracking_id=mtxhistory-21" width="234" height="60" scrolling="no" border="0" marginwidth="0" style="border:none;" frameborder="0"></iframe>
    </div>
    <app-header id="header"></app-header>
    <router-view id="content"/>
    <app-footer id="footer"></app-footer>
  </div>
</template>

<script>
  import Header from './components/Header/Header.vue';
  import Footer from './components/Footer/Footer.vue';

  export default {
    components: {
      'app-header': Header,
      'app-footer': Footer
    },

    metaInfo() {
      return {
        meta: [
          {
            name: 'MTX History - Path of Exile',
            content: 'This is a fan made website for the daily deals available on Path of Exile Shop and their historical prices.'
          }
        ]
      }
    }
  }
</script>

<style lang="scss" scoped>
  app-header {
    vertical-align: top;
  }

  app-content {
    vertical-align: middle;
  }

  app-footer {
    vertical-align: bottom;
  }

  #app {
    margin: 1%;
    border: 2px solid #7c5436;
    border-radius: 4px;
    background: #271b11;
  }

  #side_ad {
    width: auto;
  }

  .asider {
    z-index: 1;
    width: auto;
    float: right;
    right: 2%;
    bottom: 1%;
    position: fixed;
    text-align: center;
    margin-bottom: 10px;
  }

  .adDiv {
    margin-bottom: 7px;
    text-align: center;
  }

  #patreonLink {
    color: #e06f18;
  }

  #patreonText {
    margin-bottom: 2px;
  }

  .adDiv:hover, #patreonLink:hover {
    color: #ff8f39;
  }
</style>
