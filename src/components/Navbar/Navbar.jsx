import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <div>
      <Link to="/">Products</Link>
      <Link to="/cart">Cart</Link>
      <Link to="/product/1">Example Product</Link>
      <Link to="/history">Shopping History</Link>
    </div>
  );
}
