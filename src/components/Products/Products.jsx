import React, { useEffect, useState } from 'react';
import { useCart } from '../../store/CartProvider';
import api from '../../api/api';
import { productData } from '../../data/products';
import ProductCard from '../shared/ProductCard';
import './Products.css';

export default function Products() {
  const [state, dispatch] = useCart();

  const [products, setProducts] = useState([]);
  const [activeProducts, setActiveProducts] = useState([]);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    api.get('/product').then(({ data }) => {
      // TODO - replace with real data
      setProducts(productData);
      setActiveProducts(productData);
    });
  }, []);

  useEffect(() => {
    const data = products.filter(
      (product) => product.name.toLowerCase().indexOf(searchText) !== -1,
    );
    setActiveProducts(data);
  }, [products, searchText]);

  return (
    <div style={{ width: '100%' }}>
      <div className="ProductsSearchContainer sticky-top input-group input-group-lg">
        <input
          type="text"
          className="form-control"
          aria-label="Sizing example input"
          aria-describedby="inputGroup-sizing-lg"
          style={{ width: '50px' }}
          placeholder="Search Products"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>
      <div className="ProductsContainer">
        {activeProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
