import React from 'react'
export const Basket = function (props) {
    const basketListDisplay = () => {
        try {
            // console.log('basket, data from parent', props.dataFromParent)
            return props.dataFromParent.filter(x => {
                return x.visibilityOnProductList === false;
            }).map(x => (<div className="listedProduct" key={x.product}>
                <div className={'product-section-' + x.product}
                    key={'product-section-' + x.product}
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

    return (
        <div className='productOnBasketObject'>
            {basketListDisplay()}
            <div className="basketSummary">
                {basketSummary()}
            </div>
        </div>
    )
}