import React from 'react';
import { useCart } from '../../store/CartProvider';

export default function ShoppingCart() {
  const [state, dispatch] = useCart();
  return <div>{JSON.stringify(state, null, 2)}</div>;
}
