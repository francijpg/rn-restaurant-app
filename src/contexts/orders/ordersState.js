import React, {useReducer} from 'react';

import OrdersReducer from './ordersReducer';
import OrdersContext from './ordersContext';

const OrdersState = ({children}) => {
  const initialState = {
    order: [],
  };

  const [state, dispatch] = useReducer(OrdersReducer, initialState);

  const value = {
    order: state.order,
  };

  return (
    <OrdersContext.Provider value={value}>{children}</OrdersContext.Provider>
  );
};

export default OrdersState;
