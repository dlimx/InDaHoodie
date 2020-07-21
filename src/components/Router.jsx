import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Navbar from './Navbar/Navbar';
import Orders from './Orders/Orders';
import ProductDetails from './ProductDetails/ProductDetails';
import Products from './Products/Products';
import OrderCart from './OrderCart/OrderCart';
import Filters from './Filters/Filters';
import ProductAdd from './ProductAdd/ProductAdd';
import OrderDetails from './OrderDetails/OrderDetails';
import Customers from './Customers/Customers';
import CustomerAdd from './CustomerAdd/CustomerAdd';
import ProductEdit from './ProductEdit/ProductEdit';

export default function Router() {
  return (
    <BrowserRouter>
      <main className="container MainContainer">
        <Navbar />
        <Switch>
          <Route path="/customer/add">
            <CustomerAdd />
          </Route>
          <Route path="/customer">
            <Customers />
          </Route>
          <Route path="/order/:id">
            <OrderDetails />
          </Route>
          <Route path="/order">
            <Orders />
          </Route>
          <Route path="/cart">
            <OrderCart />
          </Route>
          <Route path="/filter">
            <Filters />
          </Route>
          <Route path="/product/add">
            <ProductAdd />
          </Route>
          <Route path="/product/:id/edit">
            <ProductEdit />
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
