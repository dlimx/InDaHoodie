export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
export const UPDATE_CART = 'UPDATE_CART';
export const RESET_CART = 'RESET_CART';

export const addToCart = (product, quantity) => {
  return {
    type: ADD_TO_CART,
    payload: {
      product,
      quantity,
      id: product.id,
    },
  };
};

export const removeFromCart = (id) => {
  return {
    type: REMOVE_FROM_CART,
    payload: {
      id,
    },
  };
};

export const updateCart = (id, quantity) => {
  return {
    type: UPDATE_CART,
    payload: {
      id,
      quantity,
    },
  };
};

export const resetCart = (id) => {
  return {
    type: RESET_CART,
    payload: { id },
  };
};
