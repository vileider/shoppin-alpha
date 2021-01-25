import React, { useCallback } from 'react';
import { useState, useEffect } from 'react';
import './VegAndFruit.css';
import vegAndFruitDatabase from './vegAndFruitDatabase.json'
import gear from '../images/gear.png'
// import bananaImage from '../images/banana.png';

// const temporaryList = [{
//    product: "bananas",
//    visibilityOnProductList: true
// }];

const VegAndFruit = function () {
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
      pullVegAndFruitDatabase()
   }, [])
   const [productList, setProductList] = useState();
   const [vegAndFruitTransmitedData, setVegAndFruitTransmitedData] = useState()

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
      visibilityOfEachListObjectUpdate
   ) => {
      visibilityOfEachListObjectUpdate = (event, productObject) => {
         event.target.className = 'fade';
         setTimeout(() => {
            setProductList((vegAndFruitTransmitedData.map(x => {
               if (x.product === productObject) {
                  x.visibilityOnProductList = false;
                  return x;
               } else {
                  return x;
               }
            })))
         }, 200)
      }
      generatedObjectForDisplay =
         vegAndFruitTransmitedData.filter(x => {
            return x.visibilityOnProductList === true;
         }).map(x => (<div key={x.product}
            className={'product-section-' + x.product}
            onClick={(event) => {
               visibilityOfEachListObjectUpdate(event, x.product)
            }}
            title={x.product}>
            <img src={errorHandlerForUrlGenerator(x.product)
            } width='70px' height='70px' alt={x.product} />
         </div>
         ))

      return generatedObjectForDisplay;
   }

   const basketListDisplay = () => {
      return (vegAndFruitTransmitedData.filter(x => {
         return x.visibilityOnProductList === false;
      }).map(x => (
         <div className={'product-section-' + x.product} key={x.product}>
            {x.product}
         </div>
      )))
   }
   const productListObject = (
      vegAndFruitTransmitedData ? (<div className='productListObject'>
         {
            productListDisplay()
         }
      </div>)
         : (<div className='productListObject'>
            <div className='preparingComponentAnimation'>
               <img src={gear} />
            </div>
         </div>)
   )

   const productInbasketObect = (
      <div className='productInBasketObject'>
         {vegAndFruitTransmitedData && basketListDisplay()}
      </div>
   )
   return (
      <div className='masterProductContainer'>
         {productListObject}
         {productInbasketObect}
      </div>
   )
}

export default VegAndFruit;