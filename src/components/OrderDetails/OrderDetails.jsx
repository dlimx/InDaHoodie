import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import moment from 'moment';
import api from '../../api/api';
import { getTotalQuantity } from '../../util/util';
import OrderProductCard from '../shared/OrderProductCard';

export default function OrderDetails() {
  const { id } = useParams();
  const [order, setOrder] = useState({});

  useEffect(() => {
    api.get(`/order/${id}`).then(({ data }) => {
      setOrder(data);
    });
  }, [id]);

  const total = getTotalQuantity(order?.products);

  return (
    <div>
      <Helmet>
        <title>InDaHoodie | Orders</title>
      </Helmet>
      <h2>{order?.customer?.first_name}&apos;s Order</h2>
      <strong>
        Total of {total} item{total === 1 ? '' : 's'}
      </strong>
      {!!order.shipment_method && (
        <p>
          Shipped via {order.shipment_method}{' '}
          {order.customer.address ? 'to' : ''} {order?.customer?.address}
        </p>
      )}
      <p>Created on {moment(order.created_at).calendar()}</p>

      <p>
        Tax: <strong>${order.tax_amount}</strong>
      </p>
      <p>
        Total: <strong>${order.total_before_tax + order.tax_amount}</strong>
      </p>

      {order.products?.map((orderProduct) => (
        <OrderProductCard key={orderProduct.id} orderProduct={orderProduct} />
      ))}
    </div>
  );
}
