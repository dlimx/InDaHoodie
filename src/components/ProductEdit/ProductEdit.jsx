import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useCart } from '../../store/CartProvider';
import api from '../../api/api';
import { productData } from '../../data/products';
import ProductForm from '../ProductForm/ProductForm';

export default function ProductEdit() {
  const { id } = useParams();
  const history = useHistory();
  const [product, setProduct] = useState({});
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    api.get(`/product/${id}`).then(({ data }) => {
      // TODO - replace with real data
      const mockData = productData.filter(
        (mockProduct) => mockProduct.id === Number.parseInt(id, 10),
      )[0];
      setProduct(mockData);
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
