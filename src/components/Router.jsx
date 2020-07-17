import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Navbar from './Navbar/Navbar';
import OrderHistory from './OrderHistory/OrderHistory';
import ProductDetails from './ProductDetails/ProductDetails';
import Products from './Products/Products';
import ShoppingCart from './ShoppingCart/ShoppingCart';

export default function Router() {
  return (
    <BrowserRouter>
      <div>
        <Navbar />
        <Switch>
          <Route path="/history">
            <OrderHistory />
          </Route>
          <Route path="/cart">
            <ShoppingCart />
          </Route>
          <Route path="/product/:id">
            <ProductDetails />
          </Route>
          <Route path="/">
            <Products />
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}
