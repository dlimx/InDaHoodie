import React from 'react';
import PropTypes from 'prop-types';

import './ProductCart.css';
import Icon from './Icon';

export default function ProductCart({ product }) {
  return (
    <div className="ProductCard">
      <div className="card ProductIconContainer">
        <Icon icon="fa-camera" className="fa-3x" />
      </div>
      <div className="ProductTextContainer">
        <h5>{product.name}</h5>
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
