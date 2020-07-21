import React from 'react';
import { useHistory } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import api from '../../api/api';
import ProductForm from '../ProductForm/ProductForm';

export default function ProductAdd() {
  const history = useHistory();

  const onSubmit = (validatedData) => {
    api.post('/product', validatedData).then((apiData) => {
      history.push('/');
    });
  };

  return (
    <div>
      <Helmet>
        <title>InDaHoodie | Add Product</title>
      </Helmet>
      <h2>Add Product</h2>
      <ProductForm onSubmit={onSubmit} submitText="Add Product" />
    </div>
  );
}
