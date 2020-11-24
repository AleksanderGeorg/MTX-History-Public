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

function getHistoryEntries() {
  return new Promise(resolve => {
    setTimeout(() => {
      var historyWikiURL = 'https://pathofexile.gamepedia.com/Daily_Deals/2020';
      var allQueries = [];

      const handleData = (response) => {
        const $ = cheerio.load(response.bodyText);
        var mtxName, mtxPrice, mtxDate;
        for(var i = 0; i < $('tbody').children().length; i++) {
          if(+$('tbody').children().eq(i).children().eq(4).text() > 0) {
            mtxName = $('tbody').children().eq(i).children().eq(1).text();
            mtxPrice = $('tbody').children().eq(i).children().eq(4).text();
            mtxDate = $('tbody').children().eq(i).children().eq(0).text();
            mtxType = $('tbody').children().eq(i).children().eq(2).text();
            if(mtxName.includes('Set'))
              mtxName = mtxName.replace('Set', 'Pack');
            if(mtxName.includes('Portal') && !mtxName.includes('Effect'))
              mtxName += ' Effect';
            if(mtxType == 'Pet' && !mtxName.includes('Pet'))
              mtxName += ' Pet';
            if(mtxName.includes('(')) {
              mtxName = mtxName.split('(')[0];
              mtxName = mtxName.substr(0, mtxName.length - 1);
            }
            if(mtxName.includes('_'))
              mtxName = mtxName.split('_').join(' ');
            if(mtxName.includes('\''))
              mtxName = mtxName.split('\'').join('');
            console.log(i + ' - ' + mtxName + ' - ' + mtxPrice + ' - ' + mtxDate);
            allQueries[allQueries.length] = getQuery(mtxName, mtxPrice, mtxDate);
          }
        }
        resolve(allQueries);
      }
      fetchJson.get(historyWikiURL).then(handleData);
    }, 250);
  });
}

function getQuery(name, price, date) {
  return 'INSERT INTO public."priceHistory"( "mtxName", "mtxPrice", "mtxDate") VALUES (\'' + name + '\', \'{' + parseInt(price) + '}\', \'{"' + date + '"}\') ON CONFLICT ("mtxName") DO UPDATE SET "mtxPrice" = array_append("priceHistory"."mtxPrice", ' + parseInt(price) + '), "mtxDate" = array_append("priceHistory"."mtxDate", \'' + date + '\');';
}

function getQueries(allQueries) {
  var mtxQueries = '';
  for(var i = 0; i < allQueries.length; i++) {
    mtxQueries += allQueries[i];
  }
  return mtxQueries;
}

async function scrapeWiki() {
  client.query(
    getQueries(await getHistoryEntries()),
    (error, results) => {
      console.log('Added history!');
      if (error) {
        throw error
      }
    }
  )
};

const getHistory = (request, response) => {
  scrapeWiki();
  response.status(200).send(`History update ...`)
}

module.exports = {
  getHistory
}