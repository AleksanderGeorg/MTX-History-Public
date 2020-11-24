<template>
  <div>
    <ad-container v-if="false"></ad-container>
    <div id="hottestList">
      <hot v-for="(deal, index) in getRandomDeals" :key="index" :deal="deal"></hot>
    </div>
    <div id="allList">
      <p>These are the special offers from Path of Exile today.</p>
      <input autocomplete="off" v-model="searchValue" id="searchInput" type="text" placeholder="Search for a deal ..." />
      <div id="allMTXS" @click="this.toggleAllMTXS">
        <p id="toggleText"><strong>{{ this.getFilterText }}</strong></p>
      </div>
      <p id="load" v-if="!getLoadedStatus">Loading deals...</p>
      <div v-if="!this.getAllMTXS" class="searchMTXS">
        <mtx v-for="(mtx, index) in getData" :key="index" :mtxData="getMTX(index)" :hidden="getHiddenStatus(searchValue, getStringFromJSON(getMTX(index).mtxName))"></mtx>
      </div>
      <div v-if="this.getAllMTXS" class="searchMTXS">
        <mtx v-for="(mtx, index) in getHistory" :key="index" :mtxData="getMTXFromHistory(index)" :hidden="getHiddenStatus(searchValue, getStringFromJSON(getMTXFromHistory(index).mtxName))"></mtx>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import MTX from './MTX/MTX.vue'
  import Hot from './Hot/Hot.vue'

  import AdContainer from './AdContainer.vue'

  export default {
    components: {
      'mtx': MTX,
      'hot': Hot,
      'ad-container': AdContainer
    },

    data() {
      return {
        searchData: {},
        searchValue: "",
        deal: {},
        mtxHistory: {},
        allMTXS: false,
        filterText: 'Show all microtransaction history'
      }
    },

    computed: {
      getData() {
        return this.searchData;
      },

      getRandomDeals() {
        if(this.getData.length >= 4) {
          var index = [];
          var selectedMTX = [];
          for(var i = 0; i < this.getData.length; i++)
            index[i] = i;
          var selectedIndex = this.shuffle(index);
          for(i = 0; i < selectedIndex.length; i++)
            selectedMTX[i] = this.getData[selectedIndex[i]];
          return selectedMTX;
        }
        else {
          return this.getData;
        }
      },

      getLoadedStatus() {
        if(this.getData.length > 0)
          return true;
        else 
          return false;
      },

      getAllMTXS() {
        return this.allMTXS;
      },

      getFilterText() {
        return this.filterText;
      },

      getHistory() {
        return this.mtxHistory;
      }
    },

    methods: {
      getMTX(index){
        return this.getData[index];
      },

      getMTXFromHistory(index){
        return this.mtxHistory[index];
      },

      getHiddenStatus(partialName, mtxName){
        if(mtxName.includes(partialName))
          return false;
        else
          return true;
      },

      getStringFromJSON(JSONObject){
        return JSON.stringify(JSONObject).toLowerCase();
      },

      shuffle(array) {
        var currentIndex = array.length, temporaryValue, randomIndex;
        while (0 !== currentIndex) {
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex -= 1;
          temporaryValue = array[currentIndex];
          array[currentIndex] = array[randomIndex];
          array[randomIndex] = temporaryValue;
        }

        return array.slice(0, 4);
      },

      getSearchData() {
        if(!this.searchData[0]){
          axios
          .get('https://mtxhistory-backend.herokuapp.com/allMTXS/')
          .then(data => {
            this.searchData = data.data;
          })
          .catch(() => {
            console.log('Database booting up or under maintenance!')
          });
        }
      },

      getMTXHistory() {
        axios
        .get('https://mtxhistory-backend.herokuapp.com/mtxHistory')
        .then(data => {
          this.mtxHistory = data.data;
          this.toggleAllMTXS();
        })
        .catch(() => {
          console.log('Database booting up or under maintenance!')
        });
      },

      toggleAllMTXS() {
        if(!this.mtxHistory[0]) {
          this.getMTXHistory();
        } else {
          this.allMTXS = !this.allMTXS;
          if(this.allMTXS == true)
            this.filterText = 'Show only daily deals'
          else if(this.allMTXS == false)
            this.filterText = 'Show all microtransaction history'
        }
      }
    },

    mounted(){
      this.getSearchData();
      setInterval(this.getSearchData, 3000);
    }
  }
</script>

<style lang="scss" scoped>
  #searchInput {
    width: 40%;
    background-color: #ddd6bf;
    color: #1b1818;
    font-size: large;
    padding: 5px 3px 5px 3px;
    display: block;
    margin-left: 10px;
    margin-right: auto;
    border-radius: 4px;
    border: 1px solid #7c5436;
    margin-bottom: 15px;
  }

  p {
    font-size: large;
    margin: 10px;
  }

  #hottestList {
    display: inline-flex;
    width: 98%;
  }

  #allMTXS {
    margin-bottom: 15px;
  }

  .searchMTXS, #allMTXS {
    margin-left: 0px;
  }

  #toggleText {
    cursor: pointer;
    color: #e06f18;
  }

  #toggleText:hover {
    color: #ff8f39;
  }
</style>