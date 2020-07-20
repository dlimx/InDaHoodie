import React from 'react';
import { NavLink, Link } from 'react-router-dom';

import './Navbar.css';
import Icon from '../shared/Icon';
import { useCart } from '../../store/CartProvider';

export default function Navbar() {
  const [cart] = useCart();

  return (
    <nav className="container navbar navbar-light fixed-top">
      <div className="navbar-brand">
        <Link className="NavbarMain" to="/">
          InDaHoodie
        </Link>
      </div>
      <div>
        <NavLink className="Navbar" activeClassName="NavbarActive" exact to="/">
          Products
        </NavLink>
        <NavLink
          className="Navbar"
          activeClassName="NavbarActive"
          to="/filters"
        >
          Filters
        </NavLink>
        <NavLink
          className="Navbar"
          activeClassName="NavbarActive"
          to="/history"
        >
          History
        </NavLink>
        <NavLink className="Navbar" activeClassName="NavbarActive" to="/cart">
          <Icon icon="fa-shopping-cart" />
          <span> ({cart.items.length})</span>
        </NavLink>
      </div>
    </nav>
  );
}
