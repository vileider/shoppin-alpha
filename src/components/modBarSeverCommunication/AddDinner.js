import React, { useState, useEffect } from 'react';

export const AddDinner = function () {
    const [IngerdientTypeList, setIngerdientTypeList] = useState()
    const [counter, setCounter] = useState(0)
    const [fieldsOfProducts, setFieldsOfProducts] = useState([])
    const changeObjectsForDinnerIngredients = (idForChange, value) => {
        let x = []
        for (let i = 0; i < 10; i++) {
            idForChange - 1 === i
                ? x.push({ id: `${i + 1}`, [`item${i + 1}`]: value, visible: false },)
                : x.push({ id: `${i + 1}`, [`item${i + 1}`]: '', visible: false },)
        }
    }
    useEffect(() => {
        let x = []
        for (let i = 0; i < 10; i++) {
            x.push({ id: i + 1, [`item${i + 1}`]: '' },)
        }
        setFieldsOfProducts(x)
    }, [])

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
                    ? <><input key={x.id} type='text' maxLength={8} />
                        <button disabled={x.id !== counter}
                            onClick={(e) => { minusButtonAction(e) }}> -</button >
                        <br />
                        <button disabled={x.id !== counter}
                            onClick={(e) => { plusButtonAction(e) }}> +</button ></>

                    : <><input key={x.id} type='text' maxLength={8} />
                        <button disabled={x.id !== counter}
                            onClick={(e) => { minusButtonAction(e) }}> -</button ><br /></>
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
        </div>
    )
    return addDinnerMenu
}

