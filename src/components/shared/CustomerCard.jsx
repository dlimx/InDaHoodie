import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { useHistory, Link } from 'react-router-dom';
import './CustomerCard.css';
import Icon from './Icon';
import { getCustomerName } from '../../util/util';

export default function CustomerCard({ customer, index }) {
  const history = useHistory();
  const route = `/order?search=${customer.id}`;

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
      className="card CustomerCard"
      role="button"
      onClick={onClick}
      onKeyDown={onKeyDown}
    >
      <div className="CustomerCardContent">
        <h4>{getCustomerName(customer)}</h4>
        {customer.birthdate && <p>{moment(customer.birthdate).calendar()}</p>}
        <div>
          <span>{customer.address}</span>
        </div>
        <div>
          <span>
            {customer.city}
            {!!customer.state && ', '}
            {customer.state}
          </span>
        </div>
        <br />
        <Link to={route}>View all orders</Link>
      </div>
      <div className="CustomerCardImage">
        <Icon icon="fa-camera" className="fa-4x" />
      </div>
    </div>
  );
}

CustomerCard.propTypes = {
  customer: PropTypes.shape({
    id: PropTypes.number.isRequired,
    first_name: PropTypes.string.isRequired,
    last_name: PropTypes.string.isRequired,
    birthdate: PropTypes.string,
    address: PropTypes.string,
    city: PropTypes.string,
    state: PropTypes.string,
  }).isRequired,
};
