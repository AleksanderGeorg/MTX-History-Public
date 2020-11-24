const express = require('express')
const app = express()
const cors = require('cors')
const port = process.env.PORT || 3000
const queries = require('./queries')
const scraper = require('./scraper')
const history = require('./history')

app.use(cors())

app.get('/', (req, res) => {
  res.send('Default page!')
})

app.get('/allMTXS', queries.getAllMTXS)
app.get('/allMTXS/:name', queries.getMTXByName)
app.put('/update/daily', scraper.updateMTXS)
app.put('/update/getHistory', history.getHistory)
app.get('/update/getLastUpdate', queries.getLastUpdate)
app.put('/update/setLastUpdate', queries.setLastUpdate)
app.get('/mtxHistory', queries.mtxHistory)
app.get('/historyMTX/:name', queries.mtxHistoryByName)

app.use((req, res) => res.status(404).send({code: '404', message: 'no found'}))

app.listen(port, () => console.log('server started on port', port))