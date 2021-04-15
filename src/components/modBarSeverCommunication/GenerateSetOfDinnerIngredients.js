import { useEffect, useState } from 'react';
import '../../styles/styles.css';
import gear from '../../images/gear.png'

export const GenerateSetOfDinnerIngredients = function ({
   liftedChildState,
   pickedParentIngredients,
   endpoint
}) {
   const [ingredientsFromDatabase, setIngredientsFromDatabase] = useState()
   useEffect(() => {
      const pullsetOfItemDatabase = async () => {
         const fetchTask = new Request(endpoint, {
            method: 'get',
            headers: {
               'Content-Type': 'application/json',
            }
         });
         await fetch(fetchTask)
            .then(response => response.json())
            .then(data => setIngredientsFromDatabase(data))
            .catch((error) => {
               console.error('Error:', error);
            });
      }
      ingredientsFromDatabase ?? pullsetOfItemDatabase()

   }, [liftedChildState, endpoint, pickedParentIngredients])

   const imgUrlGenerator = (props) => {
      return require('../../images/' + props + '.png').default;
   }

   const errorHandlerForUrlGenerator = (props) => {
      try {
         return imgUrlGenerator(props)
      } catch (e) {
         if (e.message) {
            console.log('there is no image for this:', e.message)
            return require('../../images/picture-not-found.png').default
         }
      }
   }

   const productListDisplay = (
      generatedObjectForDisplay,
      visibilityOfEachListObjectUpdate,
      addToProductCount
   ) => {
      visibilityOfEachListObjectUpdate = (event, productObject) => {
         setIngredientsFromDatabase((ingredientsFromDatabase.map(x => {
            if (x.product === productObject) {
               x.visibilityOnProductList = false;
               return x;
            } else {
               return x;
            }
         })))
      }
      addToProductCount = async (e) => {
         let alternativeNameInPromise = new Promise((resolve, reject) => {
            resolve(e.target.alt)
         })
         await alternativeNameInPromise.then(value => {
            liftedChildState(
               setOfItemData.map(x => {
                  x.product === value && x.count++
                  return x
               })
            )
         })
      }
      generatedObjectForDisplay = setOfItemData.map(x => {
         if (x.visibilityOnProductList === true) {
            return (<div key={x.product}
               className={'product-section-' + x.product}
               onClick={(event) => {
                  visibilityOfEachListObjectUpdate(event, x.product);
               }}
               title={x.product}>
               <img src={errorHandlerForUrlGenerator(x.product)
               } alt={x.product} position="absolute" />
            </div>
            )

         } else if (x.visibilityOnProductList === false) {
            return (<div key={x.product}
               className={'fade'}
               onClick={(event) => { addToProductCount(event) }}
               title={x.product}>
               <img src={errorHandlerForUrlGenerator(x.product)
               } alt={x.product} />
               <div className='productCounter' position="absolute">{x.count}</div>
            </div>
            )
         }
         return x
      }
      )
      return generatedObjectForDisplay;
   }

   const productListObject = (setOfItemData ?
      productListDisplay() : (<div className='productsOnListObject' >
         <div className='preparingComponentAnimation'>
            <img src={gear} alt='waitning animation' />
         </div>
      </div>)
   )

   return productListObject

}

