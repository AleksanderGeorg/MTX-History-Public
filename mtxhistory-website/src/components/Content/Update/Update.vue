<template>
  <div>
    
  </div>
</template>

<script>
  export default {
    data() {
      return {
        
      }
    },
    mounted(){
      var axios = require('axios');
      var config = {
        method: 'put',
        url: 'https://mtxhistory-backend.herokuapp.com/update/daily',
        headers: { }
      };
      axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
    }
  }
</script>

<style lang="scss" scoped>
  
</style>