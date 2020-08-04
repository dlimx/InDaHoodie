import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { useCart } from '../../store/CartProvider';
import OrderProductCard from '../shared/OrderProductCard';
import { resetCart } from '../../store/cartActions';
import api from '../../api/api';
import { getCustomerName } from '../../util/util';

export default function OrderCart() {
  const history = useHistory();
  const [cart, dispatchCart] = useCart();
  const [shipment_method, setShipmentMethod] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState('');
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    api.get('/customer').then(({ data }) => {
      setCustomers(data);
      setLoading(false);
    });
  }, []);

  const onShippingChange = (e) => {
    e.preventDefault();
    setShipmentMethod(e.target.value);
  };

  const onReset = (e) => {
    e.preventDefault();
    dispatchCart(resetCart());
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (!cart.items || !cart.items.length) {
      setError('Please enter some items');
      return;
    }
    if (!selectedCustomer) {
      setError('Please select a valid customer');
      return;
    }

    setError('');

    api
      .post('/order/create', {
        shipment_method,
        products: cart.items.map((item) => ({
          id: item.id,
          quantity: item.quantity,
        })),
        customer_id: selectedCustomer,
      })
      .then((data) => {
        history.push('/order');
        dispatchCart(resetCart());
      })
      .catch((err) => {
        setError('An unexpected error occurred');
      });
  };

  return (
    <div>
      <Helmet>
        <title>InDaHoodie | Cart</title>
      </Helmet>
      <div className="form-group">
        <label htmlFor="customer">Customer</label>
        {/* eslint-disable-next-line jsx-a11y/no-onchange */}
        <select
          className="form-control"
          id="customer"
          aria-describedby="emailHelp"
          placeholder="Enter email"
          value={selectedCustomer}
          onChange={(e) => setSelectedCustomer(e.target.value)}
        >
          <option />
          {customers.map((customer) => (
            <option key={customer.id} value={customer.id}>
              {getCustomerName(customer)}
            </option>
          ))}
        </select>
      </div>
      <input
        type="text"
        className="form-control"
        id="shipping"
        placeholder="Shipping Method"
        onChange={onShippingChange}
        value={shipment_method}
      />

      <br />
      {cart.items.map((orderProduct) => (
        <OrderProductCard
          orderProduct={orderProduct}
          key={orderProduct?.product?.id}
          editable
        />
      ))}
      <br />

      {!!error && <p className="text-danger">{error}</p>}

      <div className="Row">
        <button
          type="button"
          onClick={onReset}
          className="btn btn-lg btn-danger"
          style={{ flex: 1 }}
          disabled={!cart.items?.length}
        >
          Reset Cart
        </button>
        <span className="Separator" />
        <button
          type="submit"
          onClick={onSubmit}
          className="btn btn-lg btn-primary"
          style={{ flex: 3 }}
          disabled={!cart.items?.length || !selectedCustomer}
        >
          Submit Order
        </button>
      </div>
    </div>
  );
}
