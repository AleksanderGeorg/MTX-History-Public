const fetchJson = require('fetch-json');
const cheerio = require('cheerio');

const { Client } = require('pg');
const DATABASE_URL = ""

const client = new Client({
  connectionString: DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

client.connect();

var sales = [
  [], //mtxNames
  [], //mtxTypes
  [], //mtxImages
  [], //mtxTexts
  [], //mtxVideos
  [], //CurrentPrices
  [] //NormalPrices
];

function printSales() {
  console.log('Name - Type - Image URL - Description - Video URL - Current Price - Normal Price');
  for(var i = 0; i < sales[0].length; i++) {
    console.log(sales[0][i] + ' - ' + sales[1][i] + ' - ' + sales[2][i] + ' - ' + sales[3][i] + ' - ' + sales[4][i] + ' - ' + sales[5][i] + ' - ' + sales[6][i]);
  }
}

function getNames(mtxArray) {
  var mtxNames = [];
  for(var i = 0; i < mtxArray.length; i++) {
    var exists = false;
    var $ = cheerio.load(mtxArray[i].toString())
    if(mtxNames != null){
      for(var j = 0; j < mtxNames.length; j++) {
        if(mtxNames[j] == $('.name').first().text().split('\'').join('')) {
          exists = true;
        }
      }
    }
    if(!exists) {
      mtxNames[i] = $('.name').first().text().split('\'').join('');
    }
  }
  return mtxNames;
}

function getTypes(mtxArray) {
  const keywords = [
    ['Stash Tab', 'Hideout Decoration', 'Portal Effect', 'Armour Pack', 'Back Attachment', 'Character Effect', 'Item Skin', 'Weapon Effect', 'Skill Effect', 'Headgear', 'Pet', 'Body Armour', 'Gloves', 'Boots', 'Skill Effect Pack', 'Hideout', 'Skin Transfer', 'Bundle'],
    [
      ['stash tab', 'premium tabs', 'premium tab', 'extra tab', 'collection tab'],
      ['personal hideout', 'hideout decoration', 'hideout decorations'],
      ['portal effect', 'portals'],
      ['armour skins'],
      ['wings', 'cloak', 'back attachment', 'cape', 'eye in the back'],
      ['character effect', 'effect to your amulet'],
      ['shield', 'bow ', 'bow.', 'sword', 'axe', 'mace', 'staff', 'dagger', 'wand'],
      ['imbues a weapon'],
      ['skill gem', 'gem', 'golem', 'skill with', 'raised spectre'],
      ['headgear'],
      ['stick by you', 'on your journey', 'on your journeys', 'weta', 'accompany you', 'travels with you', 'follow you', 'journey with you', 'will journey alongside you', 'on your travels', 'will brighten even the darkest of days', 'heart of your enemies'],
      ['piece of body armour'],
      ['pair of gloves'],
      ['pair of boots'],
      ['effects'],
      ['hideout to your account'],
      ['skin transfer', 'skin transfers'],
      ['contains the pitch', 'contains the bolted']
    ]
  ];
  var mtxTypes = [];
  for(var i = 0; i < mtxArray.length; i++) {
    var mtxType = 'undefined';
    var $ = cheerio.load(mtxArray[i].toString())
    for(var j = 0; j < keywords[1].length; j++) {
      for(var k = 0; k < keywords[1][j].length; k++) {
        if($('.description').text().toLowerCase().includes(keywords[1][j][k]))
          mtxType = keywords[0][j];
      }
      
    }
    mtxTypes[i] = mtxType;
  }
  return mtxTypes;
}

function getImage(mtxName) {
  return new Promise(resolve => {
    setTimeout(() => {
      var mtxWikiURL = 'https://pathofexile.gamepedia.com/' + mtxName;
      var mtxImage = '';
      const handleData = (response) => {
        const $ = cheerio.load(response.bodyText);
        if($('a').filter('.image').children('img').attr('src')) {
          mtxImage = $('a').filter('.image').children('img').attr('src').split('.png')[0]+'.png';
        } else { mtxImage = 'noImage' }
        resolve(mtxImage);
      }
      fetchJson.get(mtxWikiURL).then(handleData);
    }, 250);
  });
}

function getTexts(mtxArray) {
  var mtxTexts = [];
  for(var i = 0; i < mtxArray.length; i++) {
    mtxTexts[i] = '';
    var $ = cheerio.load(mtxArray[i].toString());
    mtxTexts[i] = $('.description').text().split('\'').join('');
  }
  return mtxTexts;
}

function getVideos(mtxArray) {
  var mtxVideos = [];
  for(var i = 0; i < mtxArray.length; i++) {
    var $ = cheerio.load(mtxArray[i].toString())
    mtxVideos[i] = 'https://www.youtube.com/embed/'+$('.video').attr('data-id');
  }
  return mtxVideos;
}

function getCurrentPrices(mtxArray) {
  var CurrentPrices = [];
  for(var i = 0; i < mtxArray.length; i++) {
    var $ = cheerio.load(mtxArray[i].toString())
    CurrentPrices[i] = $('.totalCost').text();
  }
  return CurrentPrices;
}

function getNormalPrices(mtxArray) {
  var NormalPrices = [];
  for(var i = 0; i < mtxArray.length; i++) {
    var $ = cheerio.load(mtxArray[i].toString())
    if($('.cost').length == 0 && !(+$('.totalCost').text() > +$('.value').text()))
      NormalPrices[i] = $('.value').text();
    else if(+$('.totalCost').text() > +$('.value').text()) {
      NormalPrices[i] = +$('.totalCost').text() + +$('.value').text();
    }
    else NormalPrices[i] = $('.cost').text();
  }
  return NormalPrices;
}

function getQueries(table) {
  var mtxQueries = '';
  for(var i = 0; i < sales[0].length; i++) {
    mtxQueries += ('INSERT INTO public.' + table + '( "mtxName", "mtxType", "mtxImage", "mtxText", "mtxVideo", "CurrentPrice", "NormalPrice") VALUES (\'' + sales[0][i] + '\', \'' + sales[1][i] + '\', \''  + sales[2][i] + '\', \'' + sales[3][i] + '\', \'' + sales[4][i] + '\', ' + parseInt(sales[5][i]) + ', ' + parseInt(sales[6][i]) + ') ON CONFLICT ("mtxName") DO NOTHING;');
  }
  console.log(mtxQueries);
  return mtxQueries;
}

function getHistoryQueries() {
  var historyQueries = '';
  var date = new Date();
  const getFullMonth = (month) => {
    if(month < 10)
      return '0' + month;
    else
      return month;
  }
  var currentDate = date.getFullYear() + '-' + ('0' + getFullMonth(date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2);
  for(var i = 0; i < sales[0].length; i++)
    historyQueries += ('INSERT INTO public."priceHistory"( "mtxName", "mtxPrice", "mtxDate") VALUES (\'' + sales[0][i] + '\', \'{' + parseInt(sales[5][i]) + '}\', \'{"' + currentDate + '"}\') ON CONFLICT ("mtxName") DO UPDATE SET "mtxPrice" = array_append("priceHistory"."mtxPrice", ' + parseInt(sales[5][i]) + '), "mtxDate" = array_append("priceHistory"."mtxDate", \'' + currentDate + '\')  WHERE "priceHistory"."mtxDate"[array_length("priceHistory"."mtxDate", 1)] != \'' + currentDate + '\';');
  return historyQueries;
}

function getNZTime() {
  return new Promise(resolve => {
    const axios = require('axios');
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
}

function getLastUpdate() {
  return new Promise(resolve => {
    client.query('SELECT "updateDate" FROM public."updateLog" ORDER BY "updateDate" DESC LIMIT 1;', async (error, results) => {
      if (error) {
        throw error
      }
      var NZTime = await getNZTime();
      if(NZTime[0] > results.rows[0].updateDate && (Date.parse(NZTime[1])-Date.parse(results.rows[0].updateDate +' 16:05'))/36e5 > 24.02) {
        resolve(true);
      }
      else resolve(false);
    });
  }, 250);
}

function getMTXArray(poeURL) {
  return new Promise(resolve => {
    const handleData = (response) => {
      const $ = cheerio.load(response.bodyText);
      var mtxArray = [];
      $('.name').closest('.shopBuyItemModal').each(function(i, elem) {
        if($(this).children('.content').children('.savings').children('.onSaleIcon').length > 0) {
          mtxArray.push($(this));
        }
      });
      resolve(mtxArray);
    }
    fetchJson.get(poeURL).then(handleData);
  }, 250);
}

async function scrapePoe() {
  if(await getLastUpdate()) {
    const poeURLS = [
      'https://www.pathofexile.com/shop/category/stash-tabs',
      'https://www.pathofexile.com/shop/category/bundles',
      'https://www.pathofexile.com/shop/category/armour-effects',
      'https://www.pathofexile.com/shop/category/back-attachments',
      'https://www.pathofexile.com/shop/category/weapon-effects',
      'https://www.pathofexile.com/shop/category/portals',
      'https://www.pathofexile.com/shop/category/alternate-skill-effects',
      'https://www.pathofexile.com/shop/category/character-effects',
      'https://www.pathofexile.com/shop/category/footprint-effects',
      'https://www.pathofexile.com/shop/category/guild',
      'https://www.pathofexile.com/shop/category/pets',
      'https://www.pathofexile.com/shop/category/hideout-decorations',
      'https://www.pathofexile.com/shop/category/account-features'
    ];

    var mtxArray = [];
    var salesTempNames = [];
    var salesTempImages = [];

    for(var site = 0; site < poeURLS.length; site++) {
      salesTempNames = [];
      salesTempImages = [];
      console.log('Getting deals from ' + poeURLS[site]);
      mtxArray = await getMTXArray(poeURLS[site]);
      salesTempNames = getNames(mtxArray);
      sales[0] = sales[0].concat(salesTempNames);
      sales[1] = sales[1].concat(getTypes(mtxArray));
      for(var i = 0; i < mtxArray.length; i++) {
        salesTempImages[i] = await getImage(salesTempNames[i]);
      }
      sales[2] = sales[2].concat(salesTempImages);
      sales[3] = sales[3].concat(getTexts(mtxArray));
      sales[4] = sales[4].concat(getVideos(mtxArray));
      sales[5] = sales[5].concat(getCurrentPrices(mtxArray));
      sales[6] = sales[6].concat(getNormalPrices(mtxArray));
    }
    //printSales();
    client.query(
      'DELETE FROM public.daily WHERE daily."mtxName" IS NOT NULL;' + getQueries('daily'),
      (error, results) => {
        if (error) {
          throw error
        }
      }
    )
    client.query(
      getHistoryQueries(),
      (error, results) => {
        if (error) {
          throw error
        }
      }
    )
    console.log('Update complete!');
  } else {console.log('Already updated!');}
}

const updateMTXS = (request, response) => {
  scrapePoe();
  response.status(200).send(`Updated MTXs ...`)
}

module.exports = {
  updateMTXS
}