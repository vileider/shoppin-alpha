import React from 'react';

const PickingPanel = function () {
    let test;
    const pullDatabase = () => {
        let vegAndFruitDatabase;
        fetch('http://localhost:8000', {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: (vegAndFruitDatabase)
        })
            .then(response => response.json())
            .then(vegAndFruitDatabase => { test = vegAndFruitDatabase })
        console.log(test)
    }

    const panelSets = (
        <div>
            <button onClick={pullDatabase}>click</button>

        </div>
    )

    return panelSets;

}
export default PickingPanel;