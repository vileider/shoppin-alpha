import React, { useState } from 'react'
export const Basket = function (props) {
    const [basketClassName, setBasketClassName] = useState('productsOnBasketClosed')
    const recipeFold = () => {
        (basketClassName === 'productsOnBasketHide')
            ? setBasketClassName('productsOnBasketObject')
            : (basketClassName === 'productsOnBasketClosed')
                ? setBasketClassName('productsOnBasketObject')
                : setBasketClassName('productsOnBasketHide')


    }
    const basketListDisplay = () => {
        try {
            // console.log('basket, data from parent', props.dataFromParent)
            return props.dataFromParent.filter(x => {
                return x.visibilityOnProductList === false;
            }).map(x => (<div className="productContainer" key={x.product}>
                <div className='productName'
                    key={'productSelection_' + x.product}
                    style={{ flex: '80%' }}>
                    {`${x.count}  ${x.product}`}
                </div>
                <div className="price" >{x.price * x.count} {` £`} </div>
            </div>
            ))
        } catch (e) {
            if (e) {
                console.log('BASKET DONT HAVE ARRAY', e.message)
            }
        }
    }

    const basketSummary = () => {
        let count = 0
        try {
            props.dataFromParent.filter(x => {
                return x.visibilityOnProductList === false
            }).map(x => count += x.price * x.count)
            return count
        } catch (e) {
            if (e) {
                console.warn('basket summary dont have array')
                return count
            }
        }
    }

    return (<>
        <div className={basketClassName}>
            {/* <img alt='123' src={require('../images/paragon_1.png').default} /> */}
            {basketListDisplay()}


        </div>
        <div className="basketSummary" onClick={() => { recipeFold() }}>
            {basketSummary()}
        </div>
    </>
    )
}