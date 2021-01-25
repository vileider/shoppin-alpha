const { request, response } = require('express');
const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors())
const fs = require('fs');


app.get('/', async (request, response) => {
    await fs.readFile('./src/components/vegAndFruitDatabase.json',
        'utf8',
        (err, data) => {
            setTimeout(() => {
                if (err) throw err;
                let fileJson = JSON.parse(data);
                console.log('send from entry-point /')
                response.json(fileJson)
            }, 60000);

        })
})


app.listen(8000, () => { console.log('server on port 8000') })
