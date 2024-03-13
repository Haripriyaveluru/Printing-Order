import React, { createContext, useContext, useEffect, useReducer, useState } from 'react';

import { cartReducer, productReducer } from './Reducers';
import { faker } from '@faker-js/faker';








const Cart = createContext();
faker.seed(123);
const Context = ({children}) => {

    

     const [page, setPage] = useState(1);
    
     
      
        
        const products = ([...Array(60)].map(()=> ({
        id: faker.string.uuid(),
        name: faker.commerce.productName(),
        price: faker.commerce.price(),
        image: faker.image.urlLoremFlickr(),
        instock: faker.number.int({min:1, max:5}),
    }))
    );
    console.log({products});
     
   
    
    
        
    
        
        console.log(products.length)
        const [state, dispatch]= useReducer(cartReducer, {
            products: products,
            cart:[],
        });

        

        const [productState, productDispatch] = useReducer( productReducer, {
    
            searchQuery: "",
          });
          console.log(productState);

          const selectPageHandler = (selectedPage) => {
            if (selectedPage >= 1 && selectedPage <= products.length / 10 && selectedPage !== page) {
              setPage(selectedPage)
            }
          }      
          

  return (
    <>
        <Cart.Provider value={{state, dispatch, productState, productDispatch}}>{children}</Cart.Provider>
     
    {products.length>0 && <div className="pagination">
        <span onClick={() => selectPageHandler(page - 1)} className={page > 1 ? "" : "pagination__disable"}>◀</span>

        {[...Array(products.length / 10)].map((_, i) => {
          return <span key={i} className={page === i + 1 ? "pagination__selected" : ""} onClick={() => selectPageHandler(i + 1)}>{i + 1}</span>
        })}

        <span onClick={() => selectPageHandler(page + 1)} className={page < products.length / 10 ? "" : "pagination__disable"}>▶</span>
      </div>}
    </>
  )

    
}      


export const CartState =() => {
    return useContext(Cart);
};
export default Context;
