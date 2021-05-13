import React, {createContext, useContext, useReducer} from 'react';

import StorageReducer from './storageReducer';
import services from '../../services';
import {
  GET_PRODUCTS_SUCCESSFULLY,
  GET_ONE_PRODUCT,
} from '../../constants/actionTypes';

export const StorageContext = createContext();
const {database} = services;

export function useStorage() {
  return useContext(StorageContext);
}

const StorageProvider = ({children}) => {
  const initialState = {
    menu: [],
    order: [],
    dish: null,
  };

  const [state, dispatch] = useReducer(StorageReducer, initialState);

  const getProducts = (stock = true) => {
    const productsRef = database.products.where('stock', '==', stock);
    const query = productsRef.orderBy('category');
    query.onSnapshot(handleSnapshot);

    function handleSnapshot(snapshot) {
      let dishes = snapshot.docs.map(doc => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });

      dispatch({
        type: GET_PRODUCTS_SUCCESSFULLY,
        payload: dishes,
      });
    }
  };

  const getOneProduct = dish => {
    dispatch({type: GET_ONE_PRODUCT, payload: dish});
  };

  const setOrder = order => {
    console.log(order);
  };

  const value = {
    menu: state.menu,
    order: state.order,
    dish: state.dish,
    getProducts,
    getOneProduct,
    setOrder,
  };

  return (
    <StorageContext.Provider value={value}>{children}</StorageContext.Provider>
  );
};

export default StorageProvider;
