<template>
    <div id="footer">
      <div id="appDescription">
        <p>
          This is a fan made website for the daily deals available on Path of Exile (PoE) Shop and their historical prices.
        </p>
        <p>
          Please support MTX History website and development on <a href="https://www.patreon.com/mtxhistory" target="_blank">Patreon</a>. Every little bit helps!
        </p>
        <p>
          All videos and microtransaction data are from <a href="https://www.pathofexile.com/shop/category/daily-deals" target="_blank">https://www.pathofexile.com/shop/category/daily-deals</a>
        </p>
        <p>
          All images are from <a href="https://pathofexile.gamepedia.com" target="_blank">https://pathofexile.gamepedia.com</a>
        </p>
        <p>
          <a target="_blank" href="https://icons8.com/icons/set/queen-uk">Queen Crown icon</a> icon by <a target="_blank" href="https://icons8.com">Icons8</a>
        </p>
      </div>
      <div id="appInfo">
        <h5>MTX History {{ year }}</h5>
        <h6>Version {{ version }}</h6>
        <h6 v-if="isSearch()">Last updated NZDT {{ lastUpdated }}</h6>
      </div>
    </div>
</template>

<script>
  import axios from 'axios'

  export default {
    data() {
      return {
        version: '1.1',
        year: '2020',
        lastUpdate: ''
      }
    },

    computed: {
      lastUpdated() {
        return this.lastUpdate;
      }
    },

    methods: {
      getNZTime() {
        return new Promise(resolve => {
          axios
          .get('https://worldtimeapi.org/api/timezone/Pacific/Auckland')
          .then(data => {
            var NZTime = data.data.datetime;
            resolve([NZTime.substr(0,10), NZTime.split('+')[0]]);
          })
          .catch(() => {
            console.log('Database booting up or under maintenance!')
          });
        })
      },

      updateDaily() {
        var config = {
          method: 'put',
          url: 'https://mtxhistory-backend.herokuapp.com/update/daily',
          headers: { }
        };
        axios(config)
        .then(function (response) {
          var dateConfig = {
            method: 'put',
            url: 'https://mtxhistory-backend.herokuapp.com/update/setLastUpdate',
            headers: {}
          }
          axios(dateConfig)
          .then(function (response) {
            console.log('Setting last update!');
            console.log(JSON.stringify(response.data));
            location.reload();
          })
          .catch(function (error) {
            console.log(error);
          });
          console.log(JSON.stringify(response.data));
        })
        .catch(function (error) {
          console.log(error);
        });
      },

      getUpdateData() {
        if(this.lastUpdate == ''){
          axios
          .get('https://mtxhistory-backend.herokuapp.com/update/getLastUpdate')
          .then( async data => {
            this.lastUpdate = data.data[0].updateDate;
            var NZTime = await this.getNZTime();
            if(NZTime[0] > this.lastUpdate && (Date.parse(NZTime[1])-Date.parse(this.lastUpdate +' 16:05'))/36e5 > 24.02) {
              this.updateDaily();
            }
            else {
              console.log('All is up to date!');
              this.lastUpdate = NZTime[0];
            }
          })
          .catch(() => {
            console.log('Database booting up or under maintenance!')
          });
        }
      },

      isSearch() {
        if(window.location.href == "https://mtxhistory.com/" || window.location.href == "http://mtxhistory.com/" || window.location.href == "http://www.mtxhistory.com/" || window.location.href == "https://www.mtxhistory.com/" || window.location.href == "https://mtxhistory.com" || window.location.href == "http://mtxhistory.com" || window.location.href == "http://www.mtxhistory.com" || window.location.href == "https://www.mtxhistory.com")
          return true;
        else
          return false;
      }
    },

    mounted(){
      if(window.location.href == "https://mtxhistory.com/" || window.location.href == "http://mtxhistory.com/" || window.location.href == "http://www.mtxhistory.com/" || window.location.href == "https://www.mtxhistory.com/" || window.location.href == "https://mtxhistory.com" || window.location.href == "http://mtxhistory.com" || window.location.href == "http://www.mtxhistory.com" || window.location.href == "https://www.mtxhistory.com") {
        this.getUpdateData();
        setInterval(this.getSearchData, 1000);
      }
    }
  }
</script>

<style lang="scss" scoped>
  h5 {
    text-align: right;
    margin-bottom: 5px;
  }

  h6 {
    margin: 0px;
    text-align: right;
    padding-bottom: 10px;
  }

  p {
    font-size: small;
  }

  #appDescription{
    float: left;
    width: 70%;
  }

  #appInfo {
    float: right;
    width: 20%;
  }
</style>