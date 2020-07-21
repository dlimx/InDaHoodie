import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import api from '../../api/api';
import { orderData } from '../../data/orders';
import { getPrice, getTotalQuantity } from '../../util/util';
import OrderProductCard from '../shared/OrderProductCard';

export default function OrderDetails() {
  const { id } = useParams();
  const [order, setOrder] = useState({});

  useEffect(() => {
    api.get(`/order/${id}`).then(({ data }) => {
      // TODO - replace with real data
      const mockData = orderData.filter(
        (mockOrder) => mockOrder.id === Number.parseInt(id, 10),
      )[0];
      setOrder(mockData);
    });
  }, [id]);

  const total = getTotalQuantity(order?.products);

  return (
    <div>
      <h2>{order?.customer?.first_name}&apos;s Order</h2>
      <strong>
        Total of {total} item{total === 1 ? '' : 's'}
      </strong>
      <p>
        Shipped via {order.shipping} to {order?.customer?.address}
      </p>
      <p>Created on {order?.created_at?.toDateString()}</p>

      {order.products?.map((orderProduct) => (
        <OrderProductCard
          key={orderProduct.product.id}
          orderProduct={orderProduct}
        />
      ))}
    </div>
  );
}
