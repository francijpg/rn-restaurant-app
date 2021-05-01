import {
  GET_PRODUCTS_SUCCESSFULLY,
  GET_ONE_PRODUCT,
} from '../../constants/actionTypes';

export default (state, action) => {
  switch (action.type) {
    case GET_PRODUCTS_SUCCESSFULLY:
      return {
        ...state,
        menu: action.payload,
      };
    case GET_ONE_PRODUCT:
      return {
        ...state,
        dish: action.payload,
      };
    default:
      return state;
  }
};
