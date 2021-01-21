import React from 'react';
import { useState } from 'react';
import './VegAndFruit.css';
import vegAndFruitDatabase from './vegAndFruitDatabase.json'
// import bananaImage from '../images/banana.png';

// const temporaryList = [{
//    product: "bananas",
//    visibilityOnProductList: true
// }];

const VegAndFruit = function () {

   const [productList, setProductList] = useState(vegAndFruitDatabase);

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
            setProductList((productList.map(x => {
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
         productList.filter(x => {
            return x.visibilityOnProductList === true;
         }).map(x => (<div key={x.product}
            className={'product-section-' + x.product}
            onClick={(event) => {
               visibilityOfEachListObjectUpdate(event, x.product)
            }}
            title={x.product}>
            <img src={errorHandlerForUrlGenerator(x.product)
            } width='80px' height='80px' alt={x.product} />
         </div>
         ))

      return generatedObjectForDisplay;
   }

   const basketListDisplay = () => {
      return (productList.filter(x => {
         return x.visibilityOnProductList === false;
      }).map(x => (
         <div className={'product-section-' + x.product} key={x.product}>
            {x.product}
         </div>
      )))
   }
   const productListObject = (
      <div className='productListObject'>
         {productListDisplay()}
      </div>
   )
   const productInbasketObect = (
      <div className='productInBasketObject'>
         {basketListDisplay()}
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