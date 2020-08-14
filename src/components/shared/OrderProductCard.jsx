import React, { useState } from 'react';
import PropTypes from 'prop-types';

import './OrderProductCard.css';
import { Link } from 'react-router-dom';
import Icon from './Icon';
import { useCart } from '../../store/CartProvider';
import { removeFromCart, updateCart } from '../../store/cartActions';

export default function OrderProductCard({ orderProduct, editable }) {
  const [cart, dispatchCart] = useCart();
  const { product } = orderProduct;
  const [quantity, setQuantity] = useState(orderProduct.quantity);
  const [error, setError] = useState('');

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

  const onReset = (e) => {
    e.preventDefault();
    setQuantity(product?.quantity);
  };

  const onRemove = (e) => {
    e.preventDefault();
    dispatchCart(removeFromCart(product.id));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!quantity) {
      dispatchCart(removeFromCart(product.id));
    } else {
      dispatchCart(updateCart(product.id, quantity));
    }
  };

  const changed = quantity !== orderProduct.quantity;

  const renderForm = () => {
    if (!editable)
      return (
        <div className="Row">
          <span className="OrderProductCardFormLabel">
            Quantity: {quantity}
          </span>
        </div>
      );
    return (
      <div className="OrderProductCardFormContainer">
        <div className="Row">
          <span className="OrderProductCardFormLabel">Quantity:</span>
          <span className="Separator" />
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
        </div>
        <div className="Row OrderProductCardFormButtons">
          <button type="button" onClick={onRemove} className="btn btn-outline">
            <span className="text-danger">Remove</span>
          </button>
          <button
            type="button"
            onClick={onReset}
            className="btn btn-outline"
            disabled={!changed}
          >
            Cancel
          </button>
          <button
            type="submit"
            onClick={onSubmit}
            className="btn btn-primary"
            disabled={!changed}
          >
            Save
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="card OrderProductCard">
      <div className="OrderProductCardContent">
        <div>
          <Link to={product ? `/product/${product.id}` : '#'}>
            <h4>{product?.name || 'Deleted Product'}</h4>
          </Link>
          <p>{product?.designer?.name}</p>
        </div>
        {renderForm()}
      </div>

      <div className="CustomerCardImage">
        <Icon icon="fa-camera" className="fa-4x" />
      </div>
    </div>
  );
}

OrderProductCard.propTypes = {
  orderProduct: PropTypes.shape({
    id: PropTypes.number.isRequired,
    quantity: PropTypes.number.isRequired,
    product: PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      categories: PropTypes.array,
      designer: PropTypes.object,
    }),
  }),
  editable: PropTypes.bool,
};
