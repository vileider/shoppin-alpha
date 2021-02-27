import { useEffect } from 'react';
import './GenerateSetOfItems.css';
import gear from '../images/gear.png'

export const GenerateSetOfItems = function ({
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
      setTimeout(() => {
         pullsetOfItemDatabase()
      }, 500)
   }, [liftedChildState, endpoint])

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
      addToProductCount
   ) => {
      visibilityOfEachListObjectUpdate = (event, productObject) => {
         event.target.className = 'fade';
         liftedChildState((setOfItemData.map(x => {
            if (x.product === productObject) {
               x.visibilityOnProductList = false;
               x.count++
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
      generatedObjectForDisplay =
         setOfItemData.filter(x => {
            return x.visibilityOnProductList === true;
         }).map(x => (<div key={x.product}
            className={'product-section-' + x.product}
            onClick={(event) => {
               visibilityOfEachListObjectUpdate(event, x.product);
            }}
            title={x.product}>
            <img src={errorHandlerForUrlGenerator(x.product)
            } alt={x.product} position="absolute" />
         </div>
         ))
      generatedObjectForFadeDisplay =
         setOfItemData.filter(x => {
            return x.visibilityOnProductList === false;
         }).map(x => (<div key={x.product}
            className={'fade'}
            onClick={(event) => { addToProductCount(event) }}
            title={x.product}>
            <img src={errorHandlerForUrlGenerator(x.product)
            } alt={x.product} />
            <div className='productCounter' position="absolute">{x.count}</div>
         </div>
         ))

      return (<>{generatedObjectForDisplay} {generatedObjectForFadeDisplay}</>);
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
