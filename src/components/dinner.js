import { useEffect } from 'react';
import './GenerateSetOfItems.css';
import gear from '../images/gear.png'

export const Dinner = function ({
    liftedChildState,
    setOfItemData,
    endpoint
}) {
    useEffect(() => {
        console.log('endpoint', endpoint);
        const pullsetOfItemDatabase = async () => {
            const fetchTask = new Request(endpoint, {
                method: 'get',
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            await fetch(fetchTask)
                .then(response => response.json())
                .then(data => liftedChildState(data))
                .catch((error) => {
                    console.error('Error:', error);
                });

        }

        setOfItemData ?? pullsetOfItemDatabase()

    }, [liftedChildState, endpoint, setOfItemData])

    const imgUrlGenerator = (props) => {
        return require('../images/' + props + '.png').default;
    }

    const errorHandlerForUrlGenerator = (props) => {
        try {
            return imgUrlGenerator(props)
        } catch (e) {
            if (e.message) {
                console.log('there is no image for this:', e.message)
                return require('../images/picture-not-found.png').default
            }
        }
    }

    const productListDisplay = (
        generatedObjectForDisplay,
        generatedObjectForFadeDisplay,
        visibilityOfEachListObjectUpdate,
        readIngredientsDataFromDatabase
    ) => {
        readIngredientsDataFromDatabase = async (demadedItems) => {
            let filteredDataOnDemand
            const fetchTask = new Request('machingDinnerData', {
                method: 'post',
                body: JSON.stringify(demadedItems),
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            await fetch(fetchTask)
                .then(response => response.json())
                .then(data => filteredDataOnDemand = data)
                .catch((error) => {
                    console.error('Error:', error);
                });
            return filteredDataOnDemand
        }
        visibilityOfEachListObjectUpdate = async (event, productObject, demandedItems) => {
            const ingredientsFromDatabase =
                await readIngredientsDataFromDatabase(demandedItems)
                    .then(value => value)
            liftedChildState((setOfItemData.map(x => {
                if (x.product === productObject) {
                    x.visibilityOnProductList = false;
                    x.ingredientsDeveloped = ingredientsFromDatabase.map(x => x);
                    return x;
                } else {
                    return x;
                }
            })))
        }
        generatedObjectForDisplay =
            setOfItemData.filter(x => {
                return x.visibilityOnProductList === true;
            }).map(x => (<div key={x.product}
                className={'product-section-' + x.product}
                onClick={(event) => {
                    visibilityOfEachListObjectUpdate(event, x.product, x.ingredients);
                }}
                title={x.product}>
                <img src={errorHandlerForUrlGenerator(x.product)
                } alt={x.product} position="absolute" />
                <div className='productName' position="absolute">{x.product}</div>
            </div>
            ))
        // generatedObjectForFadeDisplay =
        //     setOfItemData.filter(x => {
        //         return x.visibilityOnProductList === false;
        //     }).map(x => (<><div key={x.product}
        //         className={'fade'}
        //         title={x.product}>
        //         <img src={errorHandlerForUrlGenerator(x.product)
        //         } alt={x.product} />
        //     </div>
        //         <div className='productName' position="absolute">{x.product}</div></>
        //     ))

        // return (<>{generatedObjectForDisplay} {generatedObjectForFadeDisplay}</>);
        return generatedObjectForDisplay;
    }

    const productListObject = (setOfItemData ?
        productListDisplay() : (<div className='productOnListObject' >
            <div className='preparingComponentAnimation'>
                <img src={gear} alt='waitning animation' />
            </div>
        </div>)
    )

    return productListObject

}

