import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import api from '../../api/api';
import { productData } from '../../data/products';
import ProductCard from '../shared/ProductCard';
import './Products.css';
import Icon from '../shared/Icon';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [activeProducts, setActiveProducts] = useState([]);
  const [searchText, setSearchText] = useState('');
  const history = useHistory();

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

  const onClickAdd = (e) => {
    e.preventDefault();
    history.push('/product-add');
  };

  const onKeyDownAdd = (e) => {
    e.preventDefault();
    if (e.keyCode === 13) {
      history.push('/product-add');
    }
  };

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
        <div
          className="ProductCard"
          role="button"
          onClick={onClickAdd}
          onKeyDown={onKeyDownAdd}
          tabIndex={0}
        >
          <div className="card ProductIconContainer ProductAddCard">
            <Icon icon="fa-camera" className="fa-3x" />
          </div>
          <div className="ProductTextContainer ProductAddCardText">
            <h5>Add New Product</h5>
          </div>
        </div>
      </div>
    </div>
  );
}
