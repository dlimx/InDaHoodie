import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  RESET_CART,
  UPDATE_CART,
} from './cartActions';
import { orderData } from '../data/orders';

export const initialState = {
  items: [],
};

export default function cartReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case ADD_TO_CART: {
      return {
        ...state,
        items: [...state.items, { ...payload }],
      };
    }
    case REMOVE_FROM_CART: {
      return {
        ...state,
        items: state.items.filter((item) => item.product.id !== payload.id),
      };
    }
    case UPDATE_CART: {
      const index = state.items.findIndex(
        (item) => item.product.id === payload.id,
      );
      const newItem = {
        ...state.items[index],
        quantity: payload.quantity,
      };
      const newItems = [...state.items];
      newItems[index] = newItem;
      return {
        ...state,
        items: newItems,
      };
    }
    case RESET_CART: {
      return {
        ...initialState,
      };
    }
    default:
      return state;
  }
}
