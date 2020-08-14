import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import api from '../../api/api';
import OrderCard from '../shared/OrderCard';
import Loading from '../shared/Loading';

export default function Orders() {
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    api.get('/order').then(({ data }) => {
      setOrders(data);
      setLoading(false);
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
      {loading && <Loading />}
      {orders.map((order, index) => (
        <OrderCard order={order} key={order.id} />
      ))}
    </div>
  );
}
