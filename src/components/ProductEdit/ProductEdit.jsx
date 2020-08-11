import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { useCart } from '../../store/CartProvider';
import api from '../../api/api';
import ProductForm from '../ProductForm/ProductForm';

export default function ProductEdit() {
  const { id } = useParams();
  const history = useHistory();
  const [product, setProduct] = useState({});
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    api.get(`/product/${id}`).then(({ data }) => {
      setProduct(data);
      setLoaded(true);
    });
  }, [id]);

  const onSubmit = (validatedData) => {
    api.put(`/product/${id}`, validatedData).then(({ data }) => {
      history.push(`/product/${id}`);
    });
  };

  return (
    <div>
      <Helmet>
        <title>InDaHoodie | Edit Product</title>
      </Helmet>
      <h2>Edit Product</h2>
      {loaded ? (
        <ProductForm
          onSubmit={onSubmit}
          submitText="Edit Product"
          initialValues={product}
        />
      ) : null}
    </div>
  );
}
