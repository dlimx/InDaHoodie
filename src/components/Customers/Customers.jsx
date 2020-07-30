import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import api from '../../api/api';
import { customerData } from '../../data/customers';
import CustomerCard from '../shared/CustomerCard';
import './Customers.css';

export default function Customers() {
  const history = useHistory();
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/customer').then(({ data }) => {
      setCustomers(data);
      setLoading(false);
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
      <Helmet>
        <title>InDaHoodie | Customers</title>
      </Helmet>
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
