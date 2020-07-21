import React, { useState } from 'react';
import * as yup from 'yup';
import { useHistory } from 'react-router-dom';

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
      <h2>Add Product</h2>
      <ProductForm onSubmit={onSubmit} submitText="Add Product" />
    </div>
  );
}
