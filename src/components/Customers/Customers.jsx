import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import api from '../../api/api';
import { customerData } from '../../data/customers';
import CustomerCard from '../shared/CustomerCard';
import './Customers.css';

export default function Customers() {
  const history = useHistory();
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    api.get('/customer').then((data) => {
      // TODO - use actual data
      setCustomers(customerData);
    });
  }, []);

  const onClick = (e) => {
    e.preventDefault();
    history.push('/customer/add');
  };

  const onKeyDown = (e) => {
    e.preventDefault();
    if (e.keyCode === 13) {
      history.push('/customer/add');
    }
  };

  return (
    <div>
      {customers.map((customer, index) => (
        <CustomerCard customer={customer} index={index} key={customer.id} />
      ))}
      <div
        role="button"
        tabIndex={0}
        className="card CustomerAddCard"
        onClick={onClick}
        onKeyDown={onKeyDown}
      >
        <h4 className="CustomerAddCardTitle">Add Customer</h4>
      </div>
    </div>
  );
}
