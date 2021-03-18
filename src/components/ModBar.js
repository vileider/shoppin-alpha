import '../styles/styles.css';
import React, { useState } from 'react'
export const ModBar = function () {
    const [clickedMenu, setclickedMenu] = useState('clickedMenuOff')
    const [itemMenuState, setItemMenuState] = useState({
        productName: '',
        productCategory: '',
        productPrice: ''
    })
    const itemMenuStateChange = (name, catgory, price) => {
        let itemMenu = {
            productName: name, productCategory: catgory, productPrice: price
        }
        setItemMenuState(itemMenu)
    }
    const menuNameClassName = (newClassName) => {
        clickedMenu === 'clickedMenuOff'
            ? setclickedMenu(newClassName)
            : setclickedMenu('clickedMenuOff')
    }
    const addItemMenu = (
        <div>
            <div>
                <div>Product Name:</div>
                <input type='text' maxLength={16} onChange={(e) => {
                    itemMenuStateChange(e.target.value,
                        itemMenuState.productCategory,
                        itemMenuState.productPrice)
                }} />
            </div>

            <div>
                <div>Category:</div>
                <div onChange={(e) => {
                    itemMenuStateChange(itemMenuState.productName,
                        e.target.value,
                        itemMenuState.productPrice)
                }}><label>
                        <input type='radio' value='test1' onChange={e => { }}
                            checked={itemMenuState.productCategory === 'test1'} />test1</label>
                    <label><input type='radio' value='test2' onChange={e => { }}
                        checked={itemMenuState.productCategory === 'test2'} />test2</label>
                    <label><input type='radio' value='test3' onChange={e => { }}
                        checked={itemMenuState.productCategory === 'test3'} />test3</label>
                </div>

                <div>
                    <div>Price:</div>
                    <input type='text' maxLength={2} size='1' onChange={(e) => {
                        itemMenuStateChange(itemMenuState.productName,
                            itemMenuState.productCategory,
                            e.target.value)
                    }} />
                </div>

                <button>Add</button>
            </div >

        </div>
    )
    const itemButton = (
        <div className='itemButton' onTouchStart={() => {
            menuNameClassName('itemMenu')
        }}>
            ADD ITEM</div>
    )
    const dinnerButton = (
        <div className='dinnerButton' onTouchStart={() => { test() }}>ADD DINNER</div>
    )
    return (<div className='settingsMenu'>
        <div className='buttonBar' >
            {itemButton}{dinnerButton}
        </div>
        <div className={clickedMenu}>
            {clickedMenu === 'itemMenu' && addItemMenu}
        </div>
    </div >)
}