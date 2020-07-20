import React from 'react';
import ReactDOM from 'react-dom';
import './theme/theme.css';
import * as serviceWorker from './serviceWorker';
import CartProvider from './store/CartProvider';
import Router from './components/Router';

ReactDOM.render(
  <React.StrictMode>
    <CartProvider>
      <Router />
    </CartProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
