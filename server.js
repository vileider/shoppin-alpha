const { request, response } = require('express');
const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors())
const fs = require('fs');

let testJson;
fs.readFile('./src/components/vegAndFruitDatabase.json', 'utf8', (err, data) => {
    if (err) throw err;
    testJson = JSON.parse(data);
    console.log(testJson);
});
app.get('/', (request, response) => {
    response.send(testJson)
    console.log(request.body);
})


app.listen(8000, () => { console.log('server on port 8000') })
