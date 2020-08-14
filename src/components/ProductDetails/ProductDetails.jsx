import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import api from '../../api/api';
import Icon from '../shared/Icon';
import './ProductDetails.css';
import { useCart } from '../../store/CartProvider';
import { addToCart } from '../../store/cartActions';
import { getPrice } from '../../util/util';

export default function ProductDetails() {
  const { id } = useParams();
  const history = useHistory();
  const [cart, dispatchCart] = useCart();
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    api.get(`/product/${id}`).then(({ data }) => {
      setProduct(data);
    });
  }, [id]);

  const onChange = (e) => {
    e.preventDefault();
    if (e.target.value === '') {
      setError('');
      setQuantity('');
    } else {
      try {
        const value = Number.parseInt(e.target.value, 10);
        if (Number.isNaN(value)) {
          throw new Error('Invalid error');
        }
        setError('');
        setQuantity(value.toString());
      } catch (err) {
        setError('Please enter a valid number');
        setQuantity('');
      }
    }
  };

  const onDecrease = (e) => {
    e.preventDefault();
    setError('');
    setQuantity(quantity > 1 ? quantity - 1 : 0);
  };

  const onIncrease = (e) => {
    e.preventDefault();
    setError('');
    setQuantity(quantity ? quantity + 1 : 1);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    dispatchCart(addToCart(product, quantity));
    history.push('/cart');
  };

  const onEdit = (e) => {
    e.preventDefault();
    history.push(`/product/${id}/edit`);
  };

  const onDelete = (e) => {
    e.preventDefault();
    console.log('hi');
    api
      .delete(`/product/delete/${id}`)
      .then(() => {
        console.log('hi');
        history.push('/');
      })
      .catch(() => {
        console.log('hi');
      });
  };

  return (
    <div className="ProductDetailsContainer">
      <Helmet>
        <title>InDaHoodie | Products</title>
      </Helmet>
      <div className="card ProductDetailsImage">
        <Icon icon="fa-camera" className="fa-5x" />
      </div>
      <div className="ProductDetailsText">
        <div className="Row RowSpaced">
          <h2>{product.name}</h2>
        </div>
        <strong>${getPrice(product.price)}</strong>
        <div className="Row">
          <button type="button" onClick={onEdit} className="btn btn-outline">
            <Icon icon="fa-edit" className="fa-lg" />
          </button>
          <button type="button" onClick={onDelete} className="btn btn-outline">
            <Icon icon="fa-trash" className="fa-lg" style={{ color: 'red' }} />
          </button>
        </div>
        <br />
        <p>{product.description}</p>
        <br />
        {product.designer?.name ? <span>{product.designer.name}</span> : null}
        <br />
        {product.categories?.length ? (
          <span>
            {product.categories.map((category) => category.name).join(', ')}
          </span>
        ) : null}
        <br />
        <br />
        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <button
              onClick={onDecrease}
              type="button"
              className={`input-group-text ${
                quantity === 0 ? 'ProductDetailsDisabled' : ''
              }`}
            >
              -
            </button>
          </div>
          <input
            type="text"
            className="form-control"
            placeholder="Quantity"
            aria-label="Quantity"
            value={quantity}
            onChange={onChange}
          />
          <div className="input-group-append">
            <button
              onClick={onIncrease}
              type="button"
              className="input-group-text"
            >
              +
            </button>
          </div>
        </div>
        <p className="text-danger">{error}</p>
        <button
          type="submit"
          className="btn btn-primary"
          onClick={onSubmit}
          disabled={!quantity || error}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
