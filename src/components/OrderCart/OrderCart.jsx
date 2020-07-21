import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useCart } from '../../store/CartProvider';
import OrderProductCard from '../shared/OrderProductCard';
import { resetCart } from '../../store/cartActions';
import api from '../../api/api';

export default function OrderCart() {
  const history = useHistory();
  const [cart, dispatchCart] = useCart();
  const [shipping, setShipping] = useState('');

  const onShippingChange = (e) => {
    e.preventDefault();
    setShipping(e.target.value);
  };

  const onReset = (e) => {
    e.preventDefault();
    dispatchCart(resetCart());
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (!cart.items || !cart.items.length) return;

    api.post('/order', { shipping, products: cart.items }).then((data) => {
      // TODO - use actual api data
      history.push('/order');
      dispatchCart(resetCart());
    });
  };

  return (
    <div>
      <div className="Row">
        <button
          type="button"
          onClick={onReset}
          className="btn btn-lg btn-danger"
          style={{ flex: 1 }}
        >
          Reset Cart
        </button>
        <span className="Separator" />
        <button
          type="submit"
          onClick={onSubmit}
          className="btn btn-lg btn-primary"
          style={{ flex: 3 }}
        >
          Submit Order
        </button>
      </div>
      <br />
      <div>
        <input
          type="text"
          className="form-control"
          id="shipping"
          placeholder="Shipping Method"
          onChange={onShippingChange}
          value={shipping}
        />
      </div>
      <br />
      {cart.items.map((orderProduct) => (
        <OrderProductCard
          orderProduct={orderProduct}
          key={orderProduct?.product?.id}
          editable
        />
      ))}
    </div>
  );
}
