import {
  FETCH_DISHES_SUCCESSFULLY,
  GET_DISH,
  SELECTED_ORDER,
  GET_ORDER_SUMMARY,
  REMOVE_ORDER_DISH,
  CONFIRM_ORDER,
  ORDER_DISPATCHED,
} from '../../constants/actionTypes';

export default (state, action) => {
  switch (action.type) {
    case FETCH_DISHES_SUCCESSFULLY:
      return {
        ...state,
        menu: action.payload,
      };
    case GET_DISH:
      return {
        ...state,
        dish: action.payload,
      };
    case SELECTED_ORDER:
    case CONFIRM_ORDER:
      return {
        ...state,
        order: [...state.order, action.payload],
      };
    case GET_ORDER_SUMMARY:
      return {
        ...state,
        totalToPay: action.payload,
      };
    case REMOVE_ORDER_DISH:
      return {
        ...state,
        order: state.order.filter(dish => dish.id !== action.payload),
      };
    case ORDER_DISPATCHED:
      return {
        ...state,
        order: [],
        totalToPay: 0,
        orderId: action.payload,
      };
    default:
      return state;
  }
};
