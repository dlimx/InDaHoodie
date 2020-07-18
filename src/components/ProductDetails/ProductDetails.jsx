import React from 'react';
import { useParams } from 'react-router-dom';

export default function ProductDetails() {
  const params = useParams();
  return <div>Hello Product Details for ID {params.id}</div>;
}
