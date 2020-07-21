import React from 'react';
import PropTypes from 'prop-types';
import { useHistory, Link } from 'react-router-dom';
import './CustomerCard.css';
import Icon from './Icon';

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
        <h4>
          {customer.first_name} {customer.last_name}
        </h4>
        <p>{customer.birthdate.toDateString()}</p>
        <div>
          <span>{customer.address}</span>
        </div>
        <div>
          <span>
            {customer.city}, {customer.state}
          </span>
        </div>
        <br />
        <Link to={route}>View customer orders</Link>
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
    birthdate: PropTypes.instanceOf(Date),
    address: PropTypes.string,
    city: PropTypes.string,
    state: PropTypes.string,
  }).isRequired,
};
