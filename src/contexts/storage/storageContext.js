import React, {createContext, useContext, useReducer} from 'react';

import StorageReducer from './storageReducer';
import services from '../../services';
import {GET_PRODUCTS_SUCCESSFUL} from '../../constants/actionTypes';

export const StorageContext = createContext();
const {database} = services;

export function useStorage() {
  return useContext(StorageContext);
}

const StorageProvider = ({children}) => {
  const initialState = {
    menu: [],
  };

  const [state, dispatch] = useReducer(StorageReducer, initialState);

  const getProducts = (stock = true) => {
    database.products.where('stock', '==', stock).onSnapshot(handleSnapshot);

    function handleSnapshot(snapshot) {
      let dishes = snapshot.docs.map(doc => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });

      // console.log(dishes);

      dispatch({
        type: GET_PRODUCTS_SUCCESSFUL,
        payload: dishes,
      });
    }
  };

  const value = {
    menu: state.menu,
    getProducts,
  };

  return (
    <StorageContext.Provider value={value}>{children}</StorageContext.Provider>
  );
};

export default StorageProvider;
