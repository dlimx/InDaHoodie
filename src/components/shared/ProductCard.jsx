import React from 'react';
import PropTypes from 'prop-types';
import { useHistory, Link } from 'react-router-dom';

import './ProductCart.css';
import Icon from './Icon';

export default function ProductCart({ product }) {
  const route = `/product/${product.id}`;
  const history = useHistory();

  const onClick = (e) => {
    e.preventDefault();
    history.push(route);
  };

  const onKeyDown = (e) => {
    e.preventDefault();
    if (e.keyCode === 13) {
      history.push(route);
    }
  };

  return (
    <div
      className="ProductCard"
      role="button"
      onClick={onClick}
      onKeyDown={onKeyDown}
      tabIndex={0}
    >
      <div className="card ProductIconContainer">
        <Icon icon="fa-camera" className="fa-3x" />
      </div>
      <div className="ProductTextContainer">
        <Link to={route}>
          <h5>{product.name}</h5>
        </Link>
        <strong>${Math.floor(product.price / 100)}</strong>
        {product.designers?.length ? (
          <span>
            {product.designers.map((designer) => designer.name).join(', ')}
          </span>
        ) : null}
        {product.categories?.length ? (
          <span>
            {product.categories.map((category) => category.name).join(', ')}
          </span>
        ) : null}
      </div>
    </div>
  );
}

ProductCart.propTypes = {
  product: PropTypes.shape({
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    designers: PropTypes.array,
    categories: PropTypes.array,
  }).isRequired,
};
