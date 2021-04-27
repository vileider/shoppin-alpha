const express = require('express');
const router = express.Router()
const fs = require('fs');

router.get('/', async (request, response) => {
    await fs.readFile('./database/vegAndFruitDatabase.json',
        'utf8',
        (err, data) => {
            // setTimeout(() => {
            if (err) throw err;
            let fileJson = JSON.parse(data);
            console.log('send from entry-point /vegAndfruit')
            response.json(fileJson)
            // }, 3000);

        })
})

module.exports = router