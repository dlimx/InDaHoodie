import React from 'react';
import PropTypes from 'prop-types';
import { useHistory, Link } from 'react-router-dom';

import './ProductCard.css';
import Icon from './Icon';
import { getPrice } from '../../util/util';

export default function ProductCard({ product }) {
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
    >
      <div className="card ProductIconContainer">
        <Icon icon="fa-camera" className="fa-3x" />
      </div>
      <div className="ProductTextContainer">
        <Link to={route}>
          <h4>{product.name}</h4>
        </Link>
        <strong>${getPrice(product.price)}</strong>
        {product.designer?.name ? <span>{product.designer.name}</span> : null}
        {product.categories?.length ? (
          <span>
            {product.categories.map((category) => category.name).join(', ')}
          </span>
        ) : null}
      </div>
    </div>
  );
}

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    designer: PropTypes.object,
    categories: PropTypes.array,
  }).isRequired,
};
