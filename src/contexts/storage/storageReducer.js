import {
  FETCH_DISHES_SUCCESSFULLY,
  GET_DISH,
  CONFIRM_ORDER_DISHES,
  GET_ORDER_SUMMARY,
  REMOVE_ORDER_DISH,
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
    case CONFIRM_ORDER_DISHES:
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
    default:
      return state;
  }
};
