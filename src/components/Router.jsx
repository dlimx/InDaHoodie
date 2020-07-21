import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Navbar from './Navbar/Navbar';
import Orders from './Orders/Orders';
import ProductDetails from './ProductDetails/ProductDetails';
import Products from './Products/Products';
import ShoppingCart from './ShoppingCart/ShoppingCart';
import Filters from './Filters/Filters';
import ProductAdd from './ProductAdd/ProductAdd';
import OrderDetails from './OrderDetails/OrderDetails';

export default function Router() {
  return (
    <BrowserRouter>
      <main className="container MainContainer">
        <Navbar />
        <Switch>
          <Route path="/history:/:id">
            <OrderDetails />
          </Route>
          <Route path="/history">
            <Orders />
          </Route>
          <Route path="/cart">
            <ShoppingCart />
          </Route>
          <Route path="/filters">
            <Filters />
          </Route>
          <Route path="/product-add">
            <ProductAdd />
          </Route>
          <Route path="/product/:id">
            <ProductDetails />
          </Route>
          <Route path="/">
            <Products />
          </Route>
        </Switch>
      </main>
    </BrowserRouter>
  );
}
