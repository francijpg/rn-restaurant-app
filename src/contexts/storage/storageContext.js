import React, {createContext, useContext, useReducer} from 'react';

import StorageReducer from './storageReducer';
import services from '../../services';
import {
  FETCH_DISHES_SUCCESSFULLY,
  GET_DISH,
  CONFIRM_ORDER_DISHES,
  GET_ORDER_SUMMARY,
  REMOVE_ORDER_DISH,
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
    totalToPay: 0,
  };

  const [state, dispatch] = useReducer(StorageReducer, initialState);

  const fetchDishes = (stock = true) => {
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
        type: FETCH_DISHES_SUCCESSFULLY,
        payload: dishes,
      });
    }
  };

  const getDish = dish => {
    dispatch({type: GET_DISH, payload: dish});
  };

  const setOrder = order => {
    // console.log(order);
    dispatch({
      type: CONFIRM_ORDER_DISHES,
      payload: order,
    });
  };

  const getOrderSummary = totalToPay => {
    dispatch({
      type: GET_ORDER_SUMMARY,
      payload: totalToPay,
    });
  };

  const removeOrderDish = id => {
    dispatch({
      type: REMOVE_ORDER_DISH,
      payload: id,
    });
  };

  const value = {
    menu: state.menu,
    order: state.order,
    dish: state.dish,
    totalToPay: state.totalToPay,
    fetchDishes,
    getDish,
    setOrder,
    removeOrderDish,
    getOrderSummary,
  };

  return (
    <StorageContext.Provider value={value}>{children}</StorageContext.Provider>
  );
};

export default StorageProvider;
