import React from 'react';
import PropTypes from 'prop-types';
import { Link, useHistory } from 'react-router-dom';
import moment from 'moment';
import './OrderCard.css';

export default function OrderCard({ order }) {
  const history = useHistory();
  const route = `/order/${order.id}`;

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
      className="card OrderCard"
      role="button"
      onClick={onClick}
      onKeyDown={onKeyDown}
    >
      <Link to={route}>
        <h4>{order?.customer?.first_name}&apos;s Order</h4>
      </Link>
      <p>Placed on {moment(order.created_at).calendar()}</p>
      <p>
        Total of{' '}
        <strong>
          {order?.product_count} item{order?.product_count === 1 ? '' : 's'}
        </strong>
      </p>
    </div>
  );
}

OrderCard.propTypes = {
  order: PropTypes.shape({
    id: PropTypes.number.isRequired,
    created_at: PropTypes.string.isRequired,
    product_count: PropTypes.number.isRequired,
    customer: PropTypes.shape({
      first_name: PropTypes.string.isRequired,
    }),
  }).isRequired,
};
