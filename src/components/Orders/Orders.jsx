import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import api from '../../api/api';
import OrderCard from '../shared/OrderCard';
import { orderData } from '../../data/orders';

export default function Orders() {
  const history = useHistory();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    api.get('/order').then((data) => {
      // TODO - use actual data
      setOrders(orderData);
    });
  }, []);

  return (
    <div>
      <Helmet>
        <title>InDaHoodie | Orders</title>
      </Helmet>
      <p>
        To create a new order, add items into the cart and then save it as an
        order.
      </p>
      {orders.map((order, index) => (
        <OrderCard order={order} key={order.id} />
      ))}
    </div>
  );
}
