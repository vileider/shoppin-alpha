const { request, response } = require('express');
const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors())
const fs = require('fs');
const { send } = require('process');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.use('/vegAndFruit', require('./server/routerVegAndFruit.js'))
app.use('/dinners', require('./server/routerDinners.js'))
app.use('/chemicals', require('./server/routerChemicals.js'))
app.use('/reset', require('./server/routerReset.js'))
app.use('/machingDinnerData', require('./server/routerMachingDinnerData.js'))
app.use('/dairyWheatAndEggs', require('./server/routerDairyWheatAndEggs.js'))
app.use('/everythingElse', require('./server/routerEverythingElse.js'))
app.use('/addItem', require('./server/routerAddItem.js'))

app.listen(8000, () => { console.log('server on port 8000') })


