const express = require('express');
const router = express.Router()
const fs = require('fs');


const deleteItemFromDatabase = (itemForErase) => {
    const listOfDatabase = [
        {
            databaseName: 'vegAndFruit',
            databaseFileName: 'vegAndFruitDatabase.json'
        },
        {
            databaseName: 'chemicals',
            databaseFileName: 'chemicalsDatabase.json'
        },
        {
            databaseName: 'dairyWheatAndEggs',
            databaseFileName: 'dairyWheatAndEggsDatabase.json'
        },
        {
            databaseName: 'everythingElse',
            databaseFileName: 'everythingElseDatabase.json'
        },
        {
            databaseName: 'dinners',
            databaseFileName: 'dinnersDatabase.json'
        }
    ]
    const overwriteDatabase = (databaseFileName, database) => {
        fs.writeFile(`./database/${databaseFileName}`,
            JSON.stringify(database, null, 2),
            (err) => {
                if (err) throw err;
            }
        )
    }

    listOfDatabase.forEach(x => {
        fs.readFile(`./database/${x.databaseFileName}`,
            'utf8',
            (err, data) => {
                if (err) throw err;
                let fileJson = JSON.parse(data);
                if (fileJson.filter(x => x.product === itemForErase).length > 0) {
                    fileJson = fileJson.filter(x => x.product !== itemForErase);
                    overwriteDatabase(`${x.databaseFileName}`, fileJson)
                    console.log(`item${itemForErase} deleted from ${x.databaseName}`);
                }
            })
    })

}
const sendDataFromDatabase = async () => {
    await fs.readFile('./database/vegAndFruitDatabase.json',
        'utf8',
        (err, data) => {
            // setTimeout(() => {
            if (err) throw err;
            fileJson = JSON.parse(data)
            console.log('file jason', fileJson.length)
            console.log('send from entry-point /vegAndfruit')
            return fileJson



            //}, 500);

        })
}



router.post('/', async (request, response) => {

    const dataFromClient = request.body
    //console.log(dataFromClient.itemName)
    await deleteItemFromDatabase(dataFromClient.itemName);

    await response.json(sendDataFromDatabase())

})

module.exports = router