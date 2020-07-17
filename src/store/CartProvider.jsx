import React, { useContext, useReducer } from 'react';
import PropTypes from 'prop-types';
import cartReducer, { initialState } from './cartReducer';

const StoreContext = React.createContext();
export const useCart = () => useContext(StoreContext);

export default function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  return (
    <StoreContext.Provider value={[state, dispatch]}>
      {children}
    </StoreContext.Provider>
  );
}

CartProvider.propTypes = {
  children: PropTypes.node,
};
