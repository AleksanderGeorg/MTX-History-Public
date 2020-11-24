const { Client } = require('pg')
const DATABASE_URL = ""

const client = new Client({
  connectionString: DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

client.connect();

const getAllMTXS = (request, response) => {
  client.query('SELECT * FROM daily ORDER BY "mtxName";', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  });
}

const getMTXByName = (request, response) => {
  const name = request.params.name;

  client.query('SELECT daily.*, "priceHistory"."mtxPrice", "priceHistory"."mtxDate" FROM public.daily INNER JOIN public."priceHistory" ON "daily"."mtxName"="priceHistory"."mtxName" WHERE "priceHistory"."mtxName"=$1;', [name], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  });
}

const getLastUpdate = (request, response) => {
  client.query('SELECT "updateDate" FROM public."updateLog" ORDER BY "updateDate" DESC LIMIT 1;', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  });
}

function getNZTime() {
  return new Promise(resolve => {
    const axios = require('axios');
    axios
    .get('https://worldtimeapi.org/api/timezone/Pacific/Auckland')
    .then(data => {
      var NZTime = data.data.datetime;
      resolve(NZTime.substr(0,10));
    })
    .catch(() => {
      console.log('Database booting up or under maintenance!')
    });
  })
}

async function lastUpdateQuery() {
  client.query('INSERT INTO public."updateLog"("updateDate") VALUES (\'' + await getNZTime() + '\') ON CONFLICT DO NOTHING;',
    (error, results) => {
      if (error) {
        throw error
      }
    }
  )
}

const setLastUpdate = (request, response) => {
  lastUpdateQuery();
  response.status(200).send(`Updated last update logs ...`)
}

const mtxHistory = (request, response) => {
  client.query('SELECT * FROM public."priceHistory" ORDER BY "mtxName";', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  });
}

const mtxHistoryByName = (request, response) => {
  const name = request.params.name;

  client.query('SELECT * FROM public."priceHistory" WHERE public."priceHistory"."mtxName"=$1;', [name], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  });
}

module.exports = {
  getAllMTXS,
  getMTXByName,
  getLastUpdate,
  setLastUpdate,
  mtxHistory,
  mtxHistoryByName
}