<template>
  <div>
    <br>
    <div>
      <a href="/">
        <h1>MTX History - {{ gameName }}</h1>
      </a>
    </div>
    <div v-if="false" id="amazonAd">
      <iframe src="https://rcm-eu.amazon-adsystem.com/e/cm?o=2&p=48&l=ez&f=ifr&linkID=e403699deda94d4f038640a54ac13def&t=mtxhistory-21&tracking_id=mtxhistory-21" width="728" height="90" scrolling="no" border="0" marginwidth="0" style="border:none;" frameborder="0"></iframe>
    </div>
    
  </div>
</template>

<script>
  export default {
    data() {
      return {
        gameName: 'Path of Exile'
      }
    }
  }
</script>

<style lang="scss" scoped>
  h1 {
    color: #dfcf99;
    vertical-align: top;
    text-align: center;
  }

  h1:hover {
    color: #fff0db;
  }
  
  #amazonAd {
    text-align: center;
    margin-bottom: 10px;
  }
</style>