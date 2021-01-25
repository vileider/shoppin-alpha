import React from 'react';
import './PickingPanel.css'
import gear from '../images/gear.png'
import { useState, useEffect } from 'react';

const PickingPanel = function () {
    const [vegAndFruitTransmitedData, setVegAndFruitTransmitedData] = useState()

    const pullVegAndFruitDatabase = async () => {
        const fetchTask = new Request('http://localhost:8000', {
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        await fetch(fetchTask)
            .then(response => response.json())
            .then(data => setVegAndFruitTransmitedData(data))
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    useEffect(() => {
        console.log(vegAndFruitTransmitedData)
    }, [vegAndFruitTransmitedData])

    const MainTopicPanelSet = (
        <div>
            <button onClick={() => {
                console.log(vegAndFruitTransmitedData)
            }}>console</button>
            <button onClick={() => { pullVegAndFruitDatabase() }}>click</button>
            <div className='preparingComponentAnimation'>
                <img src={gear} />

            </div>
            <div className='preparingComponentAnimation'>
                {vegAndFruitTransmitedData ? <img src={gear} /> : <div>djdjdjdjd</div>}
            </div>
        </div >
    )

    return MainTopicPanelSet;

}
export default PickingPanel;