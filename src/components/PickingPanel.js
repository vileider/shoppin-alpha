import React from 'react';
import './PickingPanel.css'
import { useState } from 'react';
import { GenerateSetOfItems } from './GenerateSetOfItems';
import { Dinner } from './dinner';
// import vegAndFruitImage from '../images/veg-fruit.png'
import chemicalsImage from '../images/chemicals.png'
// import dinners from '../images/dinners.png'
import './GenerateSetOfItems.css';
import { Basket } from './basket';
// let tempdata = require('./vegAndFruitDatabase.json')

const PickingPanel = function () {
    const [vegAndFruitTransmitedData, setVegAndFruitTransmitedData] = useState()
    const [mainButtonContentVisibilityCheck,
        setMainButtonContentVisibilityCheck] = useState([{
            vegAndFruit: false,
            chemicals: false,
            dinners: false

        }]
        )
    const [chemicalTransmitedData, setChemicalTransmitedData] = useState()
    const [dinnerTransmitedData, setDinnerTransmitedData] = useState()
    const resetServer = () => {
        console.log('i am reseting the server');
        fetch('http://localhost:8000/reset/vAF')
            .then(response => response.text()
                .then(data => console.log(data)))
            .catch(error => console.log(error))
    }

    const imgUrlGenerator = (props) => {
        return require('../images/' + props + '.png').default;
    }

    const mainButtonClick = async (e, visibility) => {
        let alternativeNameInPromise = new Promise((resolve, reject) => {
            resolve(e.target.alt)
        })
        await alternativeNameInPromise.then(value => {
            setMainButtonContentVisibilityCheck(
                mainButtonContentVisibilityCheck.map(x => {
                    console.log('odpalane', visibility)
                    x[value] = visibility
                    return x
                })
            )
        })
    }

    const mainTopicButton = (imageSource, altName,) => {
        return (
            <button className='mainButtonContent' onTouchStart={(e) => { mainButtonClick(e, true) }}>
                <img src={imageSource} alt={altName} />
            </button>
        )
    }
    const mainTopicFoldButton = (imageSource, altName,) => {
        return (
            <button className='mainButtonContent' onTouchStart={(e) => { mainButtonClick(e, false) }}>
                <img src={imageSource} alt={altName} />
            </button>
        )
    }

    const dataAvailabilityCheck = () => {
        const sourceArray = [
            vegAndFruitTransmitedData,
            chemicalTransmitedData
        ]
        let combinedArrays = []
        sourceArray.filter(x => Array.isArray(x))
            .forEach(y => combinedArrays = combinedArrays.concat(y))
        if (dinnerTransmitedData) {
            try {
                if (combinedArrays.length > 0) {
                    const dinnerIngredients = dinnerTransmitedData
                        .map(x => x.ingredientsDeveloped).flat(1)
                    combinedArrays = combinedArrays.map(x => {
                        dinnerIngredients.forEach(y => {
                            if (x.product === y.product) {
                                if (y.visibilityOnProductList === false) {
                                    x.count++
                                    y.visibilityOnProductList = true
                                }
                                x.visibilityOnProductList = false
                            }
                        })
                        return x
                    })
                }
                if (combinedArrays.length === 0) {
                    dinnerTransmitedData
                        .map(x => combinedArrays.push(x.ingredientsDeveloped))
                    return combinedArrays.flat(1)
                }
            } catch (e) {
                console.warn('array combining process has been interupted')
            }
        }
        return combinedArrays
    }

    const MainTopicPanelSet = (<>
        <div className='masterProductContainer'>
            <button className='resetButton' onClick={() => { resetServer() }}> reset server</button>
            <div className="productOnListObject">{
                mainButtonContentVisibilityCheck[0].vegAndFruit ?
                    <>
                        <GenerateSetOfItems liftedChildState={setVegAndFruitTransmitedData}
                            setOfItemData={vegAndFruitTransmitedData}
                            endpoint={'http://localhost:8000/vegAndFruit'} />
                        {mainTopicFoldButton('vegAndFruitFold', 'vegAndFruit')}</>
                    : mainTopicButton(imgUrlGenerator('veg-fruit'), 'vegAndFruit')
            }
                {
                    mainButtonContentVisibilityCheck[0].chemicals ?
                        <>
                            <GenerateSetOfItems liftedChildState={setChemicalTransmitedData}
                                setOfItemData={chemicalTransmitedData}
                                endpoint={'http://localhost:8000/chemicals'} />
                            {mainTopicFoldButton('chamicalsFold', 'chemicals')}</>
                        : mainTopicButton(imgUrlGenerator('chemicals'), 'chemicals')
                }
                {
                    mainButtonContentVisibilityCheck[0].dinners ?
                        <>
                            <Dinner liftedChildState={setDinnerTransmitedData}
                                setOfItemData={dinnerTransmitedData}
                                endpoint={'http://localhost:8000/dinners'} />
                            {mainTopicFoldButton('dinnersFold', 'dinners')}</>
                        : mainTopicButton(imgUrlGenerator('dinners'), 'dinners')
                }
            </div>
            <>
                <Basket dataFromParent={dataAvailabilityCheck()} />
            </>
        </div>
    </>
    )

    return MainTopicPanelSet;

}
export default PickingPanel;