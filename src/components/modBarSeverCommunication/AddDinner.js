import React from 'react';

export const AddDinner = function () {
    const addDinnerMenu = (
        <div className='addDinnerMenu'><div className='nameOfAddedProduct'>
            <div className='settingsTitle'>Product Name:</div>
            <input type='text' maxLength={16} onChange={(e) => { }} />
        </div></div>
    )
    return addDinnerMenu
}

