const express = require('express');
const router = express.Router()
const fs = require('fs');

router.get('/', async (request, response) => {
    await fs.readFile('./src/components/dinners.json',
        'utf8',
        (err, data) => {
            setTimeout(() => {
                if (err) throw err;
                let fileJson = JSON.parse(data);
                console.log('send from entry-point /dinners')
                response.json(fileJson)
            }, 500);

        })
})


module.exports = router