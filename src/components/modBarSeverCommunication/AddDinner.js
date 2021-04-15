import React, { useState } from 'react';
import { PickingDinnerIngredientsPanel } from './PickingDinnerIngredientsPanel'

const createFieldsOfProductsArray = () => {
    let x = []
    for (let i = 0; i < 10; i++) {
        x.push({ id: i + 1, [`item${i + 1}`]: '' },)
    }
    return x
}

export const AddDinner = function () {

    const [counter, setCounter] = useState(0)
    const [fieldsOfProducts, setFieldsOfProducts] = useState(createFieldsOfProductsArray())
    const changeObjectsForDinnerIngredients = (idForChange, value) => {
        setFieldsOfProducts(fieldsOfProducts.map(x => {
            return (
                x.id === idForChange
                    ? { id: x.id, [`item${x.id}`]: value }

                    : x
            )
        }
        ))
    }
    const plusButtonAction = (e) => {
        setCounter(counter + 1)
    }

    const minusButtonAction = (e) => {
        setCounter(counter - 1)
    }

    const generateInputFields = () => {

        return (fieldsOfProducts.filter(y => y.id < counter + 1).map(x => {
            return (
                x.id !== 10
                    ?
                    <div key={`div${x.id}`} >
                        <input key={`input-${x.id}`} type='text' maxLength={8}
                            onChange={(e) => {
                                changeObjectsForDinnerIngredients(x.id, e.target.value)
                                console.log(x[`item${x.id}`])
                            }} />

                        <button key={`button${x.id}`} disabled={x.id !== counter}
                            onClick={(e) => { minusButtonAction(e) }}> -</button >

                        <button key={`button+${x.id}`}
                            disabled={x.id !== counter || x[`item${x.id}`] === ''}
                            onClick={(e) => { plusButtonAction(e) }}> +</button >
                    </div>

                    :
                    <div key={`div${x.id}`} ><input key={`input${x.id}`} type='text' maxLength={8} />
                        <button key={`button${x.id}`} disabled={x.id !== counter}
                            onClick={(e) => { minusButtonAction(e) }}> -</button >
                    </div>
            )
        }

        ))
    }

    const addDinnerMenu = (
        <div className='addDinnerMenu'>
            <div className='nameOfAddedProduct'>
                <div className='settingsTitle'>Dinner Name:</div>
                <input type='text' maxLength={16} onChange={(e) => { }} />
            </div>

            <button disabled={counter >= 1}
                onClick={(e) => { plusButtonAction(e) }}> +</button >
            {generateInputFields()}
            {counter > 0 && <PickingDinnerIngredientsPanel />}
        </div>
    )
    return addDinnerMenu
}

