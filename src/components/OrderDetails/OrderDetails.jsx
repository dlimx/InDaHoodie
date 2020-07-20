import React from 'react';
import { useParams } from 'react-router-dom';

export default function OrderDetails() {
  const params = useParams();
  return <div>Hello Order history for {params.id}</div>;
}
